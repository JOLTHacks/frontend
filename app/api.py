def getTitles():
	return { "titles": [18] }

def getTitle(title):
	result = {
		"name": "Title",
		"section": "12",
		"order": 0,
		"subsections": [
			{
				"name": "Section",
				"section": "1",
				"order": 0,
				"subsections": [
					{
						"name": "Chapter",
						"section": "1A",
						"order": 0,
						"subsections": [],
					},
					{
						"name": "Chapter",
						"section": "1B",
						"order": 1,
						"subsections": [],
					}
				],
			},
			{
				"name": "Section",
				"section": "3",
				"order": 1,
				"subsections": [],
			}
		]
	}
	return result

def getDiffs(section):
	result = { 
		"structure": {
			"name": "Title",
			"section": "12",
			"order": 0,
			"subsections": [
				{
					"name": "Part",
					"section": "1",
					"order": 1,
					"subsections": [
						{
							"name": "Section",
							"section": "1",
							"order": 3,
							"text": "hello world",
							"diffs": [
								{
									"type": 0,
									"position": 4,
									"add": "u",
								},
								{
									"type": 1,
									"position": 4,
									"remove": 1,
								},
							],
						},
					],
				},
			],
		},
	}
	return result