type UUID = string;
type RoomId = UUID;
type UserId = UUID;

class StudyPeople {
  private readonly peopleList: Record<RoomId, UserId[]>;

  constructor() {
    this.peopleList = {};
  }

  join(room: RoomId, user: UserId) {
    if (this.peopleList[room] === undefined) {
      this.peopleList[room] = [];
    }

    this.peopleList[room].push(user);
    return this.peopleList[room];
  }

  quit(room: RoomId, user: UserId) {
    if (this.peopleList[room] === undefined) {
      this.peopleList[room] = [];
    }

    const index = this.peopleList[room].findIndex((v) => v === user);
    this.peopleList[room].splice(index, 1);
    return this.peopleList[room];
  }

  getPeople(room: RoomId) {
    if (this.peopleList[room] === undefined) {
      this.peopleList[room] = [];
    }

    return this.peopleList[room];
  }

  size(room: RoomId) {
    return this.peopleList[room].length;
  }
}

export default StudyPeople;
