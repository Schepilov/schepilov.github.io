app.directive('productText', function ()
{

    return {
        restrict: 'E',
        scope: {
            text: '=',
            maxLength: '@'
        },
        templateUrl: 'app/modules/catalog/partials/productText.html',
        controller: function ($scope)
        {
            $scope.productText = {
                data: null
            };

            if ($.isNumeric($scope.maxLength))
            {
                var maxLength = parseInt($scope.maxLength);
                var truncate = function (text)
                {
                    var index = 0;
                    var truncatedText = '';
                    var words = text.split(' ');

                    while (truncatedText.length < maxLength && index < words.length)
                    {
                        truncatedText += words[index] + ' ';
                        ++index;
                    }

                    return truncatedText.trim() + '...';
                };

                $scope.productText.requiresTruncate = String($scope.text).length > maxLength;
                $scope.productText.showTruncatedText = $scope.productText.requiresTruncate;
                $scope.productText.truncatedText = truncate($scope.text);

                $scope.$watch('productText.showTruncatedText', function (showTruncatedText)
                {
                    if (_.isBoolean(showTruncatedText))
                    {
                        if (showTruncatedText)
                        {
                            $scope.productText.data = $scope.productText.truncatedText;
                        }
                        else
                        {
                            $scope.productText.data = $scope.text;
                        }
                    }
                });
            }
            else
            {
                $scope.productText.requiresTruncate = false;
                $scope.productText.data = $scope.text;
            }
        }
    };
});