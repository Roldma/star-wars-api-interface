from marshmallow import post_load

from .planet import Planet, PlanetSchema


class PlanetResults(Planet):
    def __init__(self, climate, name, residents):
        super()

