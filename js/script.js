;
(function() {
    window.onload = function() {
        console.log('document is loaded!');

        function GoQuiz(header, submitText) {
            header = (header) ? header : 'Quiz';
            submitText = (submitText) ? submitText : 'Submit';
            var quizHtml = initQuiz(),
                quizForm,
                submitBlock;

            function newTag(params) {
                var tag = document.createElement(params.tagName);
                if (params.className) {
                    tag.className = params.className;
                }
                if (params.attributes && params.attributes.length > 0) {
                    params.attributes.forEach(function(item) {
                        tag.setAttribute(item.name, item.value);
                    })
                }
                if (params.content) {
                    tag.innerHTML = params.content;
                }
                return tag;
            }

            function initQuiz() {
                quizHtml = newTag({
                    tagName: 'div',
                    className: 'container'
                });

                quizForm = newTag({
                    tagName: 'form',
                    className: 'col-xs-12 col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-2',
                    attributes: [{
                        name: 'id',
                        value: 'quizForm'
                    }]
                });

                submitBlock = newTag({
                    tagName: 'div',
                    className: 'text-center'
                });
                submitBlock.appendChild(newTag({
                    tagName: 'button',
                    className: 'btn btn-primary',
                    content: submitText,
                    attributes: [{
                        name: 'type',
                        value: 'sumbmit'
                    }]
                }));

                quizForm.appendChild(newTag({
                    tagName: 'h3',
                    className: 'text-center',
                    content: header
                }));

                quizForm.appendChild(submitBlock);

                quizHtml.appendChild(newTag({
                    tagName: 'div',
                    className: 'row'
                })).appendChild(quizForm);
                return quizHtml;
            }

            this.addQuestion = function(data, type) {
                type = (type) ? type : 'checkbox';
                if (data && data.question && data.options && data.options.length > 0) {
                    var qBlock = newTag({
                        tagName: 'fieldset',
                    });
                    qBlock.appendChild(newTag({
                        tagName: 'legend',
                        content: data.question.text
                    }));
                    data.options.forEach(function(item) {
                        var label = newTag({
                            tagName: 'label',
                        });
                        qBlock.appendChild(newTag({
                                tagName: 'div',
                                className: type
                            })).appendChild(label)
                            .appendChild(newTag({
                                tagName: 'input',
                                attributes: [{
                                    name: 'name',
                                    value: data.question.id
                                }, {
                                    name: 'type',
                                    value: type
                                }, {
                                    name: 'value',
                                    value: item.id
                                }]
                            }));
                        label.appendChild(document.createTextNode(item.text));
                    });
                    quizForm.insertBefore(qBlock, submitBlock);
                    return true;
                } else {
                    -console.log("Couldn't add question: input data is uncorrect!");
                    return false;
                }
            };
            this.getHtml = function() {
                return quizHtml;
            };
        }

        function dummyQuestion(qNumber, optQty) {
            var qText = 'Вопрос №';
            var optText = 'Вариант ответа №';
            var data = {
                question: {
                    id: 'q' + qNumber,
                    text: qText + qNumber
                },
                options: []
            }
            for (var i = 1; i <= optQty; i++) {
                data.options.push({
                    id: 'opt' + i,
                    text: optText + i
                });
            }
            return data;
        }

        var q1 = new GoQuiz("Тест по программированию", "Проверить мои результаты");
        q1.addQuestion(dummyQuestion(1, 3));
        q1.addQuestion(dummyQuestion(2, 4));
        q1.addQuestion(dummyQuestion(3, 5), 'radio');
        document.body.appendChild(q1.getHtml());
    };
}());
