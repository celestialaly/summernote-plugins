summernote-template
=============

Allow users to insert custom templates into the WYSIWYG (bootstrap components for example).

Demo
-------------

There is a demo here : http://code.nanakii.fr/summernote-plugins/examples/template.html

Installation
-------------

### 1) Copy the plugin

You must copy the plugin/template folder into your local summernote plugin folder.

### 2) Create your templates

You have to create a folder which will contains your template in **.html** files.

Example :
- summernote/tpls/label-success.html
- summernote/tpls/label-error.html

### 3) Configure the plugin

After that, to initialize the template plugin, you have to set these options :

``` js
$('#summernote').summernote({
    toolbar: [
        ['insert', ['template']]
    ],
    template: {
        path: '/summernote/tpls', // path to your template folder
        
        /*
         * list of your templates
         * key is the html file name (without .html extension)
         * value is the label shown in the editor
         */
        list: {
            'label-success': 'Success label', // path is : /summernote/tpls/label-success.html
            'label-error': 'Error label'
        }
    },
});
```
