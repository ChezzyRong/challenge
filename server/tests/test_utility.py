import unittest
from challenge.utility import sort_and_paginate, word_count_from_html


class TestUtilityMethods(unittest.TestCase):
    def test_sort_and_paginate_descending_words(self):
        items = [("A", 4), ("B", 3), ("C", 1), ("D", 2)]
        expected = {"data": [("D", 2), ("C", 1), ("B", 3),
                             ("A", 4)], "pages": 1}

        assert(sort_and_paginate(items, 0, 'desc', 0) == expected)

    def test_sort_and_paginate_ascending_words(self):
        items = [("A", 4), ("B", 3), ("C", 1), ("D", 2)]
        expected = {"data": [("A", 4), ("B", 3), ("C", 1),
                             ("D", 2)], "pages": 1}

        assert(sort_and_paginate(items, 0, 'asc', 0) == expected)

    def test_sort_and_paginate_descending_values(self):
        items = [("A", 4), ("B", 3), ("C", 1), ("D", 2)]
        expected = {"data": [("A", 4), ("B", 3), ("D", 2),
                             ("C", 1)], "pages": 1}

        assert(sort_and_paginate(items, 1, 'desc', 0) == expected)

    def test_sort_and_paginate_ascending_values(self):
        items = [("A", 4), ("B", 3), ("C", 1), ("D", 2)]
        expected = {"data": [("C", 1), ("D", 2), ("B", 3),
                             ("A", 4)], "pages": 1}

        assert(sort_and_paginate(items, 1, 'asc', 0) == expected)

if __name__ == '__main__':
    unittest.main()
