from django.test import TestCase


class MainViewTests(TestCase):

    def test_welcome(self):
        response = self.client.get("/")
        self.assertEquals(response.status_code, 200)
