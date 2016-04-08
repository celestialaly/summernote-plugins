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
    template: {
      list: []
    }
  });

  // Extends plugins for adding templates.
  //  - plugin is external module for customizing.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'template': function (context) {
      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui      = $.summernote.ui;
      var options = context.options.template;

      // add hello button
      context.memo('button.template', function () {
        // create button
        var button = ui.buttonGroup([
          ui.button({
            className: 'dropdown-toggle',
            contents: '<span class="template"/> Template <span class="caret"></span>',
            tooltip: 'Insert Template',
            data: {
              toggle: 'dropdown'
            }
          }),
          ui.dropdown({
            className: 'dropdown-template',
            items: options.list,
            click: function (event) {
              var $button = $(event.target);
              var value   = $button.data('value');
              var path    = options.path + '/' + value + '.html';

              $.get(path)
                  .done(function (data) {
                    var node = document.createElement('span');
                    node.innerHTML = data;
                    context.invoke('editor.insertNode', node);
                  }).fail(function () {
                alert('template not found in ' + path);
              });
            }
          })
        ]);

        // create jQuery object from button instance.
        return button.render();
      });
    }
  });
}));