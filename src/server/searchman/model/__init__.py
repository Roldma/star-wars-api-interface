from marshmallow import Schema, fields


class PlanetResults:
    def __init__(self, climate, name, residents):
        self.climate = climate
        self.name = name
        self.residents = residents

    # def __repr__(self):
    #     """Function to return string value of class"""
    #     return "<<"


class PlanetSchema(Schema):
    climate = fields.Str()
    name = fields.Str()
    residents = fields.List()

