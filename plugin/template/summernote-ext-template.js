(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.options, {
        template: {}
    });

    // Extend plugins for adding templates
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'template': function (context) {
            var ui = $.summernote.ui;
            var options = context.options.template;
            var defaultOptions = {
                label: 'Template',
                tooltip: 'Insert Template',
                path: '',
                list: {}
            };

            // Assign default values if not supplied
            for (var propertyName in defaultOptions) {
                if (options.hasOwnProperty(propertyName) === false) {
                    options[propertyName] = defaultOptions[propertyName];
                }
            }

            // add template button
            context.memo('button.template', function () {
                // initialize list
                var htmlDropdownList = '';
                for (var htmlTemplate in options.list) {
                    if (options.list.hasOwnProperty(htmlTemplate)) {
                        htmlDropdownList += '<li><a href="#" data-value="' + htmlTemplate + '">' + options.list[htmlTemplate] + '</a></li>';
                    }
                }

                // create button
                var button = ui.buttonGroup([
                    ui.button({
                        className: 'dropdown-toggle',
                        contents: '<span class="template"/> ' + options.label + ' <span class="caret"></span>',
                        tooltip: options.tooltip,
                        data: {
                            toggle: 'dropdown'
                        }
                    }),
                    ui.dropdown({
                        className: 'dropdown-template',
                        items: htmlDropdownList,
                        click: function (event) {
                            event.preventDefault();

                            var $button = $(event.target);
                            var value = $button.data('value');
                            var path = options.path + '/' + value + '.html';

                            $.get(path)
                                .done(function (data) {
                                    var node = document.createElement('span');
                                    node.innerHTML = data + '<p>&nbsp;</p>';
                                    context.invoke('editor.insertNode', node);
                                })
                                .fail(function () {
                                    alert('template not found in ' + path);
                                })
                            ;
                        }
                    })
                ]);

                // create jQuery object from button instance.
                return button.render();
            });
        }
    });
}));
