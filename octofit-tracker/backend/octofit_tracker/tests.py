from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelSmokeTest(TestCase):
    def test_team_create(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')
    def test_user_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team=team)
        self.assertEqual(str(user), 'Test User')
    def test_activity_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team=team)
        activity = Activity.objects.create(user=user, type='run', duration=30, date='2026-01-01')
        self.assertEqual(str(activity), 'Test User - run')
    def test_workout_create(self):
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups', suggested_for='all')
        self.assertEqual(str(workout), 'Pushups')
    def test_leaderboard_create(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Test User', email='test@example.com', team=team)
        lb = Leaderboard.objects.create(user=user, score=100)
        self.assertEqual(str(lb), 'Test User - 100')
