Summernote Plugins
=============

Some plugins for the [Summernote WYSIWYG](https://github.com/summernote/summernote/)

Template
-------------

Allow users to insert custom templates into the WYSIWYG (bootstrap components for example).

You can view a demo here : http://code.nanakii.fr/summernote-plugins/examples/template.html


### Installation

First of all, you must copy the plugin/template folder into your local summernote plugin folder.

Secondly, you have to create a folder which will contains your template in **.html** files.

After that, to initialize the template plugin, you have to set these options :

``` js
$('#summernote').summernote({
    toolbar: [
        ['insert', ['template']]
    ],
    template: {
        path: '/summernote/templates', // path to your template folder
        list: [ // list of your template (without the .html extension)
            'accordeon'
        ]
    },
});
```


Authors
------------

- Raphaël Amourette  (amourette.raphael@gmail.com / Twitter : @_nanakii)