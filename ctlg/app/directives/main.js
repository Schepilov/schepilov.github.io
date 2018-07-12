app.directive('autoFocus', function ($timeout)
{
    return {
        link: function (scope, element, attrs)
        {
            var delay = parseInt(attrs.autoFocus, 10) || 400;
            var tag = String(element[0].tagName).toLowerCase();
            var form = element.closest('ng-form, form');

            $timeout(function ()
            {
                // Check if is first element that does not have focused input
                var isFirst = form.find('[auto-focus]:not([had-focus])').first().is(element);
                if (isFirst) {
                    if (tag === 'input' || tag === 'select' || tag === 'textarea')
                    {
                        element.focus();
                    }
                    else if (element.hasClass('ui-select-container'))
                    {
                        //https://github.com/angular-ui/ui-select/issues/201
                        element.find('input').focus();
                        angular.element(element).controller('uiSelect').activate();
                    }
                    // Set Focused flag
                    element.attr('had-focus', true);
                }
            }, delay);
        }
    };
});

app.directive('resetFilter', function ()
{
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ngModel)
        {
            var resetValue = '' + attrs.resetFilter;

            if (resetValue == 'null')
            {
                resetValue = null;
            }

            elem.addClass('link fa fa-times pull-right');
            elem.bind('click', function ()
            {
                scope.$apply(function()
                {
                    ngModel.$setViewValue(resetValue);
                });
            });

            scope.$watch(attrs.ngModel, function(val)
            {
                if (_.isUndefined(val) || String(val) === String(resetValue))
                {
                    elem.hide();
                }
                else
                {
                    elem.show();
                }
            });
        }
    };
});

app.directive('sortOrderHandle', function ()
{
    return {
        restrict: 'A',
        scope: {
            sortOrder: '=sortOrderHandle',
            sortOrderField: '@',
            reverseSortOrder: '@'
        },
        link: function (scope, element)
        {
            element.css('cursor', 'pointer');

            element.bind('click', function ()
            {
                scope.$apply(function ()
                {
                    if (scope.sortOrder.field === String(scope.sortOrderField))
                    {
                        scope.sortOrder.reverse = !scope.sortOrder.reverse;
                    }
                    else
                    {
                        scope.sortOrder.field = String(scope.sortOrderField);
                        scope.sortOrder.reverse = scope.reverseSortOrder === 'true' ? true : false;
                    }
                });
            });

            scope.$watch('sortOrder', function (sortOrder)
            {
                // reset element to plain text
                element.html(element.text());

                if (sortOrder.field === String(scope.sortOrderField))
                {
                    var cssClass = 'text-muted fa ' + (scope.sortOrder.reverse ? 'fa-caret-down' : 'fa-caret-up');

                    element.append('<i class="' + cssClass + '" style="margin-left: 8px"></i>');
                }
            }, true);
        }
    };
});

app.directive('containerBox', function ()
{
    return {
        restrict: 'C',
        link: function (scope, element, attributes)
        {
            if ($.isNumeric(attributes.containerMaxHeight) && _.isString(attributes.containerClass))
            {
                var childContainers = [];

                _.each(element.children(), function (child)
                {
                    var childElement = $(child);

                    if (childElement.hasClass(attributes.containerClass))
                    {
                        childElement.css('max-height', attributes.containerMaxHeight + 'px');
                        childElement.addClass('truncate-container');
                        childContainers.push(childElement);
                    }
                    else 
                    {
                        var buttons = childElement.find('a');

                        buttons.click(function ()
                        {
                            _.each(childContainers, function (container)
                            {
                                container.css('max-height', 'none');
                                container.removeClass('truncate-container');
                            });

                            childElement.hide();
                        });
                    }
                });
            }
        },
        controller: function ($scope)
        {
            $scope.containerBox = {
                showAllContent: false 
            };
        }
    }
});