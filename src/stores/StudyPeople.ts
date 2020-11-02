type UUID = string;
type RoomId = UUID;
type UserId = UUID;

class StudyPeople {
  private static peopleList: Record<RoomId, UserId[]>;

  constructor() {
    StudyPeople.peopleList = {};
  }

  join(room: RoomId, user: UserId) {
    if (StudyPeople.peopleList[room] === undefined) {
      StudyPeople.peopleList[room] = [];
    }

    StudyPeople.peopleList[room].push(user);
    return StudyPeople.peopleList[room];
  }

  quit(room: RoomId, user: UserId) {
    if (StudyPeople.peopleList[room] === undefined) {
      StudyPeople.peopleList[room] = [];
    }

    const index = StudyPeople.peopleList[room].findIndex((v) => v === user);
    StudyPeople.peopleList[room].splice(index, 1);
    return StudyPeople.peopleList[room];
  }

  getPeople(room: RoomId) {
    if (StudyPeople.peopleList[room] === undefined) {
      StudyPeople.peopleList[room] = [];
    }

    return StudyPeople.peopleList[room];
  }

  size(room: RoomId) {
    return StudyPeople.peopleList[room].length;
  }
}

export default StudyPeople;
