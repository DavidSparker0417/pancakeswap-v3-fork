/* eslint-disable prefer-const */
import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { concat } from "@graphprotocol/graph-ts/helper-functions";
import { IdIncrement, Point, Team, User } from "../generated/schema";
import {
  TeamAdd,
  TeamPointIncrease,
  UserChangeTeam,
  UserNew,
  UserPause,
  UserPointIncrease,
  UserPointIncreaseMultiple,
  UserReactivate,
  UserUpdate,
} from "../generated/Profile/Profile";

// BigNumber-like references
let ZERO_BI = BigInt.fromI32(0);
let ONE_BI = BigInt.fromI32(1);

/**
 * TEAM
 */

export function handleTeamAdd(event: TeamAdd): void {
  // Fail safe condition in case the team has already been created.
  let team = Team.load(event.params.teamId.toString());
  if (team === null) {
    team = new Team(event.params.teamId.toString());
    team.name = event.params.teamName;
    team.isJoinable = true;
    team.block = event.block.number;
    team.timestamp = event.block.timestamp;
    team.totalUsers = ZERO_BI;
    team.totalPoints = ZERO_BI;
    team.save();
  }
}

export function handleTeamPointIncrease(event: TeamPointIncrease): void {
  let team = Team.load(event.params.teamId.toString());
  if (team === null) {
    log.error("Error in contract, increased point when teamId: {} was not created.", [event.params.teamId.toString()]);
    team = new Team(event.params.teamId.toString());
  }

  let pointId = concat(
    Bytes.fromI32(event.params.campaignId.toI32()),
    Bytes.fromI32(event.params.teamId.toI32())
  ).toHex();
  let point = new Point(pointId);
  point.team = event.params.teamId.toString();
  point.points = event.params.numberPoints;
  point.campaignId = event.params.campaignId;
  point.hash = event.transaction.hash;
  point.block = event.block.number;
  point.timestamp = event.block.timestamp;
  point.save();

  let _team = team as Team;
  _team.totalPoints = _team.totalPoints.plus(point.points);
  _team.save();
}

/**
 * USER
 */

export function handleUserNew(event: UserNew): void {
  // Fail safe condition in case the user has already been created.
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    user = new User(event.params.userAddress.toHex());
    user.internalId = getAutoIncrementId();
    user.isActive = true;
    user.createdAt = event.block.timestamp;
    user.updatedAt = event.block.timestamp;
    user.block = event.block.number;
    user.team = event.params.teamId.toString();
    user.totalPoints = ZERO_BI;
    user.nftAddress = event.params.nftAddress;
    user.tokenId = event.params.tokenId;
    user.save();
  }

  // Update the team based on the new user joining it.
  let team = Team.load(event.params.teamId.toString());
  if (team === null) {
    log.error("Error in contract, joined team when teamId: {} was not created.", [event.params.teamId.toString()]);
    team = new Team(event.params.teamId.toString());
  }
  let _team = team as Team;
  _team.totalUsers = _team.totalUsers.plus(ONE_BI);
  _team.save();
}

export function handleUserUpdate(event: UserUpdate): void {
  // Fail safe condition in case the user has already been created.
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    user = new User(event.params.userAddress.toHex());
    user.internalId = getAutoIncrementId();
    user.isActive = true;
    user.createdAt = event.block.timestamp;
    user.updatedAt = event.block.timestamp;
    user.block = event.block.number;
    user.totalPoints = ZERO_BI;
    user.nftAddress = event.params.nftAddress;
    user.tokenId = event.params.tokenId;
    user.save();
  }

  user.nftAddress = event.params.nftAddress;
  user.tokenId = event.params.tokenId;
  user.save();
}

export function handleUserPause(event: UserPause): void {
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    log.error("Error in contract, paused user when userId: {} was not created.", [event.params.userAddress.toHex()]);
    user = new User(event.params.userAddress.toHex());
  }
  let _user = user as User;
  _user.isActive = false;
  _user.updatedAt = event.block.timestamp;
  _user.save();

  // Update the team based on the new user joining it.
  let team = Team.load(event.params.teamId.toString());
  if (team === null) {
    log.error("Error in contract, paused user when teamId: {} was not created.", [event.params.teamId.toString()]);
    team = new Team(event.params.teamId.toString());
  }
  let _team = team as Team;
  _team.totalUsers = _team.totalUsers.minus(ONE_BI);
  _team.save();
}

export function handleUserReactivate(event: UserReactivate): void {
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    log.error("Error in contract, resumed user when userId: {} was not created.", [event.params.userAddress.toHex()]);
    user = new User(event.params.userAddress.toHex());
  }
  let _user = user as User;
  _user.isActive = true;
  _user.nftAddress = event.params.nftAddress;
  _user.tokenId = event.params.tokenId;
  _user.updatedAt = event.block.timestamp;
  _user.save();

  // Update the team based on the new user joining it.
  let team = Team.load(event.params.teamId.toString());
  if (team === null) {
    log.error("Error in contract, resumed user when teamId: {} was not created.", [event.params.teamId.toString()]);
    team = new Team(event.params.teamId.toString());
  }
  let _team = team as Team;
  _team.totalUsers = _team.totalUsers.plus(ONE_BI);
  _team.save();
}

export function handleUserChangeTeam(event: UserChangeTeam): void {
  // Update the (old) team based on the user leaving it.
  let oldTeam = Team.load(event.params.oldTeamId.toString());
  if (oldTeam === null) {
    log.error("Error in contract, changed team when (old) teamId: {} was not created.", [
      event.params.oldTeamId.toString(),
    ]);
    oldTeam = new Team(event.params.oldTeamId.toString());
  }
  let _oldTeam = oldTeam as Team;
  _oldTeam.totalUsers = _oldTeam.totalUsers.minus(ONE_BI);
  _oldTeam.save();

  // Update the (new) team based on the user joining it.
  let newTeam = Team.load(event.params.newTeamId.toString());
  if (newTeam === null) {
    log.error("Error in contract, changed team when (new) teamId: {} was not created.", [
      event.params.newTeamId.toString(),
    ]);
    newTeam = new Team(event.params.newTeamId.toString());
  }
  let _newTeam = newTeam as Team;
  _newTeam.totalUsers = _newTeam.totalUsers.plus(ONE_BI);
  _newTeam.save();

  // Update the user based on his (new) team.
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    log.error("Error in contract, changed team when userId: {} was not created.", [event.params.userAddress.toHex()]);
    user = new User(event.params.userAddress.toHex());
  }
  let _user = user as User;
  _user.team = event.params.newTeamId.toString();
  _user.save();
}

export function handleUserPointIncrease(event: UserPointIncrease): void {
  let user = User.load(event.params.userAddress.toHex());
  if (user === null) {
    log.error("Error in contract, increased point when userId: {} was not created.", [
      event.params.userAddress.toHex(),
    ]);
    user = new User(event.params.userAddress.toHex());
  }

  let pointId = concat(
    Bytes.fromI32(event.params.campaignId.toI32()),
    Bytes.fromHexString(event.params.userAddress.toHex())
  ).toHex();
  let point = new Point(pointId);
  point.user = event.params.userAddress.toHex();
  point.points = event.params.numberPoints;
  point.campaignId = event.params.campaignId;
  point.hash = event.transaction.hash;
  point.block = event.block.number;
  point.timestamp = event.block.timestamp;
  point.save();

  let _user = user as User;
  _user.totalPoints = _user.totalPoints.plus(point.points);
  _user.save();
}

export function handleUserPointIncreaseMultiple(event: UserPointIncreaseMultiple): void {
  let userAddress: Address;
  for (let i = 0, k = event.params.userAddresses.length; i < k; i++) {
    userAddress = event.params.userAddresses[i];
    let user = User.load(userAddress.toHex());
    if (user === null) {
      log.error("Error in contract, increased point when userId: {} was not created.", [userAddress.toHex()]);
      user = new User(userAddress.toHex());
    }

    let pointId = concat(
      Bytes.fromI32(event.params.campaignId.toI32()),
      Bytes.fromHexString(userAddress.toHex())
    ).toHex();
    let point = new Point(pointId);
    point.user = userAddress.toHex();
    point.points = event.params.numberPoints;
    point.campaignId = event.params.campaignId;
    point.hash = event.transaction.hash;
    point.block = event.block.number;
    point.timestamp = event.block.timestamp;
    point.save();

    let _user = user as User;
    _user.totalPoints = _user.totalPoints.plus(point.points);
    _user.save();
  }
}

const getAutoIncrementId = (): BigInt => {
  let idIncrement = IdIncrement.load("1");
  if (idIncrement === null) {
    idIncrement = new IdIncrement("1");
    idIncrement.autoIncrement = ONE_BI;
    idIncrement.save();
  }
  idIncrement.autoIncrement = idIncrement.autoIncrement.plus(ONE_BI);
  idIncrement.save();

  return idIncrement.autoIncrement;
};
