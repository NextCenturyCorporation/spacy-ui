const myJSONTest1 = 
{
  "rules": [
    {
      "polarity": [],
      "description": "my name is ...",
      "pattern": [
        {
          "prefix": "",
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "length": [],
          "maximum": "",
          "shapes": [],
          "token": [
            "my"
          ],
          "minimum": "",
          "numbers": [],
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_required": "true",
          "type": "word",
          "is_in_output": "false"
        },
        {
          "prefix": "",
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "length": [],
          "maximum": "",
          "shapes": [],
          "token": [
            "name",
            "names"
          ],
          "minimum": "",
          "numbers": [],
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_required": "true",
          "type": "word",
          "is_in_output": "true"
        }
      ],
      "output_format": "{1}",
      "is_active": "true",
      "identifier": "name_rule_01"
    }
  ],
  "test_text": "My name is"

}



const myJsonFile = 
{
  "rules": [
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "my"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "name",
            "names"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "false",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_01",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "i"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "am"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_02",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "name"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            ":"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_03",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "it"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_04",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "this"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "is"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_05",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "i"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "'"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "m"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_06",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "it"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "'"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "s"
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [
            "title",
            "mixed",
            "upper"
          ],
          "part_of_speech": [
            "proper noun"
          ],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        }
      ],
      "identifier": "name_rule_07",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [
            "title"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [],
          "token": [
            "(",
            "["
          ],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "punctuation"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [
            "ddd"
          ],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "shape"
        }
      ],
      "identifier": "name_rule_08",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    },
    {
      "polarity": [],
      "pattern": [
        {
          "suffix": "",
          "capitalization": [
            "title",
            "upper",
            "mixed"
          ],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "true",
          "length": [],
          "shapes": [],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "word"
        },
        {
          "suffix": "",
          "capitalization": [],
          "part_of_speech": [],
          "prefix": "",
          "contain_digit": "",
          "is_in_vocabulary": "",
          "is_out_of_vocabulary": "",
          "is_in_output": "false",
          "length": [],
          "shapes": [
            "dddddddddd"
          ],
          "token": [],
          "is_followed_by_space": "",
          "is_required": "true",
          "type": "shape"
        }
      ],
      "identifier": "name_rule_09",
      "is_active": "true",
      "description": "a description",
      "output_format": ""
    }
  ],
  "test_text": "Hello guy's, it's Jessica here from the #@%%% Spa. I cant say the name on here, and it is JessicaLa, and it is Cold\nHi Gentlemen, My name is Ashley . my name Monica I am the one and, My names is Alanda\nName : Sara . I am the one and, Name: JILL , Name:Jessie\nAshley (702)628-9035 XOXO . Aslll (702) 628-9035 XOXO Alppp 7026289035\nI'm Ashley I'm bored i am All, I am ALL\nthis is Ashleyb I'm bored This is Ashleya  This is AshleyC"
}

; 
