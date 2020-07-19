import json


class User:

    def __init__(self):
        self.id = -1
        self.email = ''
        self.password = ''
        self.name = ''
        self.photoUrl = ''
        userCatsPhotoUrl = []

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

    @staticmethod
    def fromJSON(json_):
        result = User()
        for item in json.loads(json_).items():
            result.__setattr__(item[0], item[1])
        return result


class CatsPhoto:

    def __init__(self):
        self.id = -1
        self.photoUrl = ''
        self.breed = ''
        self.owner = -1
        self.likes = []

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

    @staticmethod
    def fromJSON(json_):
        result = CatsPhoto()
        for item in json.loads(json_).items():
            result.__setattr__(item[0], item[1])
        return result
