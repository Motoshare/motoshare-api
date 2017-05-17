#models.py
import inspect
from google.appengine.ext import ndb
import os

def caller():
    return inspect.getouterframes(inspect.currentframe())[2][1:4]

# User Model
class User(ndb.Model):
    created = ndb.DateTimeProperty(auto_now_add=True)
    email = ndb.StringProperty(required=True)
    password = ndb.StringProperty(required=True)
    fname = ndb.StringProperty(required=False)
    lname = ndb.StringProperty(required=False)
    phone = ndb.StringProperty(required=False)
    isAdmin = ndb.BooleanProperty(default=False)
    profileComplete = ndb.BooleanProperty(default=False)
    location = ndb.GeoPtProperty(required=False)
    #myMotorcycles = ndb.StructuredProperty(Motorcycle, repeated=True)
    #pastRentals = ndb.StructuredProperty(Motorcycle, repeated=True)

    def put(self):
        path = os.path.join(os.path.dirname(__file__), 'main.py')
        if User.gql('WHERE email = :1', self.email).count() > 0 and caller() != (path, 86, 'passwordreset'):
            raise UniqueConstraintViolation("email", self.email)
        ndb.Model.put(self)

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.email)

    def __repr__(self):
        return '<User %r>' % (self.email)


class UniqueConstraintViolation(Exception):
    def __init__(self, scope, value):
        super(UniqueConstraintViolation, self).__init__(
            "The email address '%s' is already in use." % (value))

# Motorcycle Model
class Motorcycle(ndb.Model):
    user = ndb.KeyProperty(kind=User)
    year = ndb.IntegerProperty(required=False)
    make = ndb.StringProperty(required=False)
    model = ndb.StringProperty(required=False)
    VIN = ndb.StringProperty(required=False)
    LIC = ndb.StringProperty(required=False)
    category = ndb.StringProperty(required=False)
    color = ndb.StringProperty(required=False)
    mileage = ndb.IntegerProperty(required=False)
    description = ndb.TextProperty(required=False)
    media = ndb.StringProperty(repeated=True)
    availabledates = ndb.JsonProperty(default=[])
    location = ndb.GeoPtProperty(required=False)
    isCompleted = ndb.BooleanProperty(default=False)
    price = ndb.IntegerProperty(required=False)

    def add_image(self, value):
        if self.media:
            self.media.append(value)
        else:
            self.media = [value]

    def get_id(self):
        return self.key.id()

class Rental(ndb.Model):
    owner = ndb.KeyProperty(kind=User)
    renter = ndb.KeyProperty(kind=User)
    motorcycle = ndb.KeyProperty(kind=Motorcycle)
    price = ndb.IntegerProperty()
    dates = ndb.JsonProperty(default=[])
    isApproved = ndb.BooleanProperty(default=False)
    isPaid = ndb.BooleanProperty(default=False)
    isComplete = ndb.BooleanProperty(default=False)

    def get_id (self):
        return self.key.id()