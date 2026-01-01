from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('Deleting old data...'))
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
            User.objects.create(name='Superman', email='superman@dc.com', team=dc),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
        ]

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        workouts = [
            Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='all'),
            Workout.objects.create(name='Running', description='Run 5km', suggested_for='all'),
            Workout.objects.create(name='Yoga', description='30 min yoga session', suggested_for='all'),
        ]

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        Activity.objects.create(user=users[0], type='run', duration=30, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='pushups', duration=10, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='yoga', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='run', duration=25, date=timezone.now().date())
        Activity.objects.create(user=users[4], type='pushups', duration=15, date=timezone.now().date())
        Activity.objects.create(user=users[5], type='yoga', duration=40, date=timezone.now().date())

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        Leaderboard.objects.create(user=users[0], score=120)
        Leaderboard.objects.create(user=users[1], score=110)
        Leaderboard.objects.create(user=users[2], score=100)
        Leaderboard.objects.create(user=users[3], score=130)
        Leaderboard.objects.create(user=users[4], score=125)
        Leaderboard.objects.create(user=users[5], score=115)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
