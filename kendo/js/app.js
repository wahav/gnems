/*global $ kendo*/
var app = app || {};

(function ($, kendo) {
	'use strict';

    app.FormTemplate = kendo.data.Model.define({
        id: 'id',
        fields: {
            id: {
                editable: false,
                nullable: false
            },
            year: {
                type: 'number'
            },
            diploma: {
                type: 'string'
            },
            section: {
                type: 'string'
            },
            sequence: {
                type: 'string'
            },
            created: {
                type: 'date'
            },
            lastUpdated: {
                type: 'date'
            },
            author:{
                type: 'string'
            },
            questionTemplates : [{id:{editable:true}}]
        }
    });
    
    // The Todo DataSource. This is a custom DataSource that extends the
	// Kendo UI DataSource and adds custom transports for saving data to
	// localStorage.
	// Implementation in js/lib/kendo.data.localstoragedatasource.ds
    app.formTemplateData = new kendo.data.extensions.LocalStorageDataSource({
		itemBase: 'gnems-formTemp',
		schema: {
			model: app.FormTemplate
		}
	});
    
    app.formTemplateViewModel = kendo.observable({
		formTemplates: app.formTemplateData,
		editSelected: {},
        filter: null,
        
        // Main element visibility handler
		isVisibleFormTemplate: function () {
			return this.get('formTemplates').data().length;
		},
        
        isFormTemplateEditSelected:function () {
            return (this.editSelected);
        },
        

		// Core CRUD Methods
		saveFormTemplate: function () {
			var formTemplates = this.get('formTemplates');
			var newFormTemplateYear = $('#new-formTemplate-year');
            var newFormTemplateField = $('#new-formTemplate-field');
            var newFormTemplateDiploma = $('#new-formTemplate-diploma');
            var newFormTemplateSection = $('#new-formTemplate-section');
            var newFormTemplateSequence = $('#new-formTemplate-sequence');
            var newFormTemplateAuthor = $('#new-formTemplate-author');

			var formTemplate = new app.FormTemplate({
                
				year: newFormTemplateYear.val().trim(),
                field: newFormTemplateField.val().trim(),
                diploma: newFormTemplateDiploma.val().trim(),
                section: newFormTemplateSection.val().trim(),
                sequence: newFormTemplateSequence.val().trim(),
                author:newFormTemplateAuthor.val().trim(),
				created: new Date(),
				lastUpdated: new Date(),
                questionTemplates: []
			});

			this.formTemplates.add(formTemplate);
			this.formTemplates.sync();
            
			newFormTemplateYear.val('');
            newFormTemplateField.val('');
            newFormTemplateDiploma.val('');
            newFormTemplateSection.val('');
            newFormTemplateSequence.val('');
            newFormTemplateAuthor.val('');
		},
        
        startEditFormTemplate: function (e) {
			e.data.set('edit', true);
			$('li[data-uid=' + e.data.uid + ']').find('input').focus();
		},
        
		endEditFormTemplate: function (e) {
			var editData = e;

			if (e.data) {
				editData = e.data;

				// If the todo has a title, set it's edit property
				// to false. Otherwise, delete it.
				if (editData.title.trim()) {
					editData.set('edit', false);
				} else {
					this.destroy(e);
				}
			}

			editData.set('edit', false);
			this.formTemplates.sync();
		},
        
        openFormTemplate: function (e) {
			/*e.data.set('edit', true);
			$('li[data-uid=' + e.data.uid + ']').find('input').focus();
            */
            // alert("Open Form Template");
            this.set('editSelected', e.data);
            console.log(this.editSelected);
            console.log(this.editSelected.uid);
        },
        
		syncFormTemplate: function () {
			this.formTemplates.sync();
		},
		destroyFormTemplate: function (e) {
			this.formTemplates.remove(e.data);
			this.formTemplates.sync();
		},
               
		// Class attribute bound methods
		formTemplateItemClass: function (item) {
			return '';
		}
       
	});
	
	// Bind the ViewModel to the todoapp DOM element
	kendo.bind($('#gnems'), app.formTemplateViewModel);
    
}($, kendo));
