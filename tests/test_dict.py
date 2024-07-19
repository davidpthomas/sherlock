
# Generated by CodiumAI

import pytest

class TestCodeUnderTest:

    # Correctly interpolates a dictionary with string values
    def test_interpolate_dict_with_string_values(self):
        from sherlock_project.sherlock import interpolate_dict
        input_dict = {"key1": "value1_{username}", "key2": "value2_{username}"}
        username = "testuser"
        expected_output = {"key1": "value1_testuser", "key2": "value2_testuser"}
        assert interpolate_dict(input_dict, username) == expected_output

    # Handles empty dictionary input
    def test_interpolate_dict_empty_input(self):
        from sherlock_project.sherlock import interpolate_dict
        input_dict = {}
        username = "testuser"
        expected_output = {}
        assert interpolate_dict(input_dict, username) == expected_output

    # Correctly interpolates a dictionary with lists as values
    def test_interpolate_dict_with_list_values(self):
        from sherlock_project.sherlock import interpolate_dict
        input_dict = {"key1": ["value1_{username}", "value2_{username}"], "key2": ["value3_{username}"]}
        username = "testuser"
        expected_output = {"key1": ["value1_testuser", "value2_testuser"], "key2": ["value3_testuser"]}
        assert interpolate_dict(input_dict, username) == expected_output

    # Correctly interpolates a list of strings
    def test_interpolate_list_with_string_values(self):
        from sherlock_project.sherlock import interpolate_list
        input_list = ["value1_{username}", "value2_{username}"]
        username = "testuser"
        expected_output = ["value1_testuser", "value2_testuser"]
        assert interpolate_list(input_list, username) == expected_output

    # Handles list with mixed data types
    def test_handles_list_mixed_data_types(self):
        from sherlock_project.sherlock import interpolate_list
        input_list = ["value1_{username}", {"key": "value2_{username}"}, ["value3_{username}"]]
        username = "testuser"
        expected_output = ["value1_testuser", {"key": "value2_testuser"}, ["value3_testuser"]]
        assert interpolate_list(input_list, username) == expected_output

    # Handles large lists efficiently
    def test_interpolate_list_with_large_list(self):
        from sherlock_project.sherlock import interpolate_list
        input_list = [f"value_{i}{{username}}" for i in range(10000)]
        username = "testuser"
        expected_output = [f"value_{i}testuser" for i in range(10000)]
        assert interpolate_list(input_list, username) == expected_output