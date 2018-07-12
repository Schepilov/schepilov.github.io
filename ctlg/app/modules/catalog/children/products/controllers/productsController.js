app.controller('productListController', function ($scope, productService)
{
    productService.fetch().then(function (products)
    {
        $scope.products = {
            data: products
        };
    });
});

app.controller('productDetailsController', function ($scope, $state, productService, productAttributesService)
{
    $scope.view = {
        slickConfig: {
            speed: 500,
            pauseOnHover: true,
            pauseOnFocus: true,
            autoplaySpeed: 5000,
            goToSpeedIndex: function ($index)
            {
                var $slick = $('slick');
                $slick[0].slick.slickSetOption('speed', 10);

                $scope.view.slickConfig.method.slickGoTo($index);

                $slick.on('afterChange', function (event, slick)
                {
                    slick.slickSetOption('speed', 500);
                });
            },
            method: {},
            event: {
                afterChange: function (event, slick, currentSlide)
                {
                    $scope.view.currentSlide = currentSlide;
                }
            }
        },
        currentSlide: 0,
        slides: [
            'assets/images/slide1.jpg',
            'assets/images/slide2.jpg',
            'assets/images/slide3.jpg'
        ]
    };

    productService.fetch().then(function (products)
    {
        productService.get(parseInt($state.params.id)).then(function (product)
        {
            var formattedAttributes = productAttributesService.format(product.attributes);

            $scope.product = {
                data: productService.flattenProductAttributes(product),
                attributes: formattedAttributes.attributes,
                related: products
            };

            productService.fetchAssets(product.id).then(function (assets)
            {
                var textAsset = _.find(assets, function (_asset)
                {
                    return _asset.name === 'ENGLISH PRODUCT DESCRIPTION';
                });

                if (textAsset && textAsset.resourceItems.length === 1) {
                    $scope.product.text = textAsset.resourceItems[0].content;
                }

                $scope.product.assets = assets;
            });
        });
    });
});