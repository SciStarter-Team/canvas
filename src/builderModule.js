export default {
    builderModule: {
        "trueFalse": {
            "label": 'Answer True or False',
            "inputFields": [
                {
                    "label": "Enter your true or false question",
                    "type": "text",
                    "placeholder": "e.g. True or false: You saw animals on your walk.",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "trueFalse",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "True",
                "False"
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            },
            "valid": false
        },
        "yesNo": {
            "label": 'Answer Yes or No',
            "inputFields": [
                {
                    "label": "Enter your yes or no question",
                    "type": "text",
                    "placeholder": "e.g. Did you see any animals on your walk?",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "yesNo",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "Yes",
                "No"
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "textField": {
            "label": 'Answer with Short Text',
            "inputFields": [
                {
                    "label": "Enter your short prompt or question (for short text)",
                    "type": "text",
                    "placeholder": "e.g. What animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Provide a tip inside the text field",
                    "type": "text",
                    "placeholder": "e.g. I saw deer, squirrels, and birds",
                    "model": "placeholder"
                }
            ],
            "question": true,
            "name": "textField",
            "fieldType": "text",
            "prompt": "",
            "placeholder": "",
            "response": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "uploadPhoto": {
            "label": 'Upload a Photo',
            "inputFields": [
                {
                    "label": "Enter your short prompt or question (for uploading a photo)",
                    "type": "text",
                    "placeholder": "e.g. Please upload a photo of an animal you saw on your walk.",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "uploadPhoto",
            "fieldType": "file",
            "prompt": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "number": {
            "label": 'Answer with a Number',
            "inputFields": [
                {
                    "label": "Enter short prompt or question (for a number)",
                    "type": "text",
                    "placeholder": "e.g. How many animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "number",
            "prompt": "",
            "fieldType": "number",
            "response": 0,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "paragraphField": {
            "label": 'Answer with Longer Text',
            "inputFields": [
                {
                    "label": "Enter a short prompt or question (for longer text)",
                    "type": "text",
                    "placeholder": "e.g. Please describe the animals you saw on your walk.",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Provide a tip inside the text field",
                    "type": "text",
                    "placeholder": "e.g. You can describe the activity of the animals, the time of day, the kind of habitat etc…",
                    "model": "placeholder"
                }
            ],
            "question": true,
            "name": "paragraphField",
            "fieldType": "textarea",
            "prompt": "",
            "placeholder": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "Select One": {
            "label": 'Multiple Choice (choose only one)',
            "inputFields": [
                {
                    "label": "Enter your short prompt or question (multiple choice, but only one)",
                    "type": "text",
                    "placeholder": "e.g. Which of these animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Select # of choices",
                    "type": "number",
                    "placeholder": "",
                    "value": 2
                },
                {
                    "label": "Please input data for each choice",
                    "type": "options",
                    "options": [
                        0,
                        1
                    ]
                }
            ],
            "question": true,
            "name": "Select One",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "",
                ""
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "Select Many": {
            "label": 'Multiple Choice (choose more than one)',
            "inputFields": [
                {
                    "label": "Write a short prompt or question (for multiple choice, more than one)",
                    "type": "text",
                    "placeholder": "e.g. Which of these animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Select # of choices",
                    "type": "number",
                    "placeholder": "",
                    "value": 4
                },
                {
                    "label": "Please input data for each choice",
                    "type": "options",
                    "options": [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            ],
            "question": true,
            "name": "Select Many",
            "fieldType": "checkbox",
            "prompt": "",
            "options": [
                "",
                "",
                "",
                ""
            ],
            "selected": [],
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "addText": {
            "inputFields": [
                {
                    "label": "Add your text below:",
                    "type": "textarea",
                    "placeholder": "",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": false,
            "name": "addText",
            "fieldType": "p",
            "prompt": ""
        },
        "addPhoto": {
            "inputFields": [
                {
                    "label": "Please upload your photo using the link below:",
                    "type": "file"
                }
            ],
            "question": false,
            "name": "addPhoto",
            "url": "",
            "prompt": "",
            "fieldType": "media"
        },
        "addVideo": {
            "inputFields": [
                {
                    "label": "Please upload your video using the link below:",
                    "type": "file"
                }
            ],
            "question": false,
            "name": "addVideo",
            "url": "",
            "prompt": "",
            "fieldType": "media"
        },
        "addFile": {
            "inputFields": [
                {
                    "label": "Please upload your file using the link below:",
                    "type": "file"
                }
            ],
            "question": false,
            "name": "addFile",
            "url": "",
            "prompt": "",
            "fieldType": "media"
        },
        "sectionBreak": {
            "inputFields": [
                {
                    "type": "break"
                }
            ],
            "question": false,
            "name": "sectionBreak",
            "prompt": "",
            "fieldType": "break"
        }
    },
    modules: {
        "trueFalse": {
            "inputFields": [
                {
                    "label": "True/False: Write your statement below:",
                    "type": "text",
                    "placeholder": "e.g. True or false: You saw animals on your walk.",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "trueFalse",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "True",
                "False"
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            },
            "valid": false
        },
        "yesNo": {
            "inputFields": [
                {
                    "label": "Yes/No: Write your question below:",
                    "type": "text",
                    "placeholder": "e.g. Did you see any animals on your walk?",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "yesNo",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "Yes",
                "No"
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "textField": {
            "inputFields": [
                {
                    "label": "Short Text: Write a short prompt or question below:",
                    "type": "text",
                    "placeholder": "e.g. What animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Provide a tip to help the user know what to write:",
                    "type": "text",
                    "placeholder": "e.g. I saw deer, squirrels, and birds",
                    "model": "placeholder"
                }
            ],
            "question": true,
            "name": "textField",
            "fieldType": "text",
            "prompt": "",
            "placeholder": "",
            "response": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "dateField": {
            "inputFields": [
                {
                    "label": "Date Field: Enter the date prompt below:",
                    "type": "text",
                    "placeholder": "e.g. What day did you begin?",
                    "model": "prompt",
                    "required": true
                },
            ],
            "question": true,
            "name": "dateField",
            "fieldType": "date",
            "prompt": "",
            "placeholder": "",
            "response": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "uploadPhoto": {
            "inputFields": [
                {
                    "label": "Image Upload: Write a short prompt below:",
                    "type": "text",
                    "placeholder": "e.g. Please upload a photo of an animal you saw on your walk.",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "uploadPhoto",
            "fieldType": "file",
            "prompt": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "number": {
            "inputFields": [
                {
                    "label": "Number: Write a short question below:",
                    "type": "text",
                    "placeholder": "e.g. How many animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": true,
            "name": "number",
            "prompt": "",
            "fieldType": "number",
            "response": 0,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "paragraphField": {
            "inputFields": [
                {
                    "label": "Longer Text: Write a short prompt or question below:",
                    "type": "text",
                    "placeholder": "e.g. Please describe the animals you saw on your walk.",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Provide a tip to help the user know what to write:",
                    "type": "text",
                    "placeholder": "e.g. You can describe the activity of the animals, the time of day, the kind of habitat etc…",
                    "model": "placeholder"
                }
            ],
            "question": true,
            "name": "paragraphField",
            "fieldType": "textarea",
            "prompt": "",
            "placeholder": "",
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "Select One": {
            "inputFields": [
                {
                    "label": "Multiple Choice (choose one): Write a short prompt or question below:",
                    "type": "text",
                    "placeholder": "e.g. Which of these animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Select # of choices",
                    "type": "number",
                    "placeholder": "",
                    "value": 4
                },
                {
                    "label": "Please input data for each choice",
                    "type": "options",
                    "options": [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            ],
            "question": true,
            "name": "Select One",
            "fieldType": "radio",
            "prompt": "",
            "options": [
                "",
                "",
                "",
                ""
            ],
            "selected": null,
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "Select Many": {
            "inputFields": [
                {
                    "label": "Multiple Choice (choose multiple):Write a short prompt or question below:",
                    "type": "text",
                    "placeholder": "e.g. Which of these animals did you see on your walk?",
                    "model": "prompt",
                    "required": true
                },
                {
                    "label": "Select # of choices",
                    "type": "number",
                    "placeholder": "",
                    "value": 4
                },
                {
                    "label": "Please input data for each choice",
                    "type": "options",
                    "options": [
                        0,
                        1,
                        2,
                        3
                    ]
                }
            ],
            "question": true,
            "name": "Select Many",
            "fieldType": "checkbox",
            "prompt": "",
            "options": [
                "",
                "",
                "",
                ""
            ],
            "selected": [],
            "checkbox": {
                "prompt": "",
                "checked": false
            }
        },
        "addText": {
            "inputFields": [
                {
                    "label": "Add your text below:",
                    "type": "textarea",
                    "placeholder": "",
                    "model": "prompt",
                    "required": true
                }
            ],
            "question": false,
            "name": "addText",
            "fieldType": "p",
            "prompt": ""
        },
        "addPhoto": {
            "inputFields": [
                {
                    "label": "Please upload your photo using the link below:",
                    "type": "file"
                }
            ],
            "question": false,
            "name": "addPhoto",
            "prompt": "",
            "fieldType": "media"
        },
        "addVideo": {
            "inputFields": [
                {
                    "label": "Please upload your video using the link below:",
                    "type": "file"
                }
            ],
            "question": false,
            "name": "addVideo",
            "prompt": "",
            "fieldType": "media"
        },
        "sectionBreak": {
            "inputFields": [
                {
                    "type": "break"
                }
            ],
            "question": false,
            "name": "sectionBreak",
            "prompt": "",
            "fieldType": "break"
        }
    },

}
