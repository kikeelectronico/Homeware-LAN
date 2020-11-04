import unittest
from data import Data

class TestData(unittest.TestCase):
    def setUp(self):
        self.data = Data()

    def test_version(self):
        self.assertEqual({'version': 'v1.0.1'}, self.data.getVersion())


if __name__ == '__main__':
    unittest.main()
