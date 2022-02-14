import unittest
from data import Data

class Test_data(unittest.TestCase):
  def setUp(self):
    print("hello")
    
  def test_boolean(self):
    self.assertEqual(True, True)

if __name__ == '__main__':
	unittest.main()
