import json


class User:

    def __init__(self):
        self.id = -1
        self.email = ''
        self.password = ''
        self.name = ''
        self.photoUrl = ''
        self.userCatsPhotoUrl = []

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=4)

    @classmethod
    def fromJSON(cls, json_):
        result = cls()
        result.__dict__.update(json.loads(json_))
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

    @classmethod
    def fromJSON(cls, json_):
        result = cls()
        result.__dict__.update(json.loads(json_))
        return result

