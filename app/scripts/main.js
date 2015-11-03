$(function(){

	/**
	 * Material fields
	 */
	
	var OLA = window.OLA || {};

	/* Mobile menu */

	var $body = $('body');
	
	$body.on('click', '.js-navicon, .js-navicon-close', function(e){		
		$body.toggleClass('menu-opened');
		e.preventDefault();
	});

	$body.on('click', '.ola-nav a', function(e){
		$body.removeClass('menu-opened');
	});


	/**
	 * Body scroll
	 */
	
	var $window = $(window).on('scroll', function(e){

		$body.toggleClass('has-scrolled', $window.scrollTop() > 100)
	})

	/* Sign up form */

	OLA.signupForm = {
		init: function(){

			var $formerror = $('.ola-form-error'),
				$formsuccess = $('.ola-form-success'),
				$formButton = $('.ola-btn-submit'),
				initialText = $formButton.text(),
				$form = $('.ola-demo-form').submit(function(e){

				$formButton
				.prop('disabled', true)
				.text('Submitting')

				$.ajax({
					url: $form.attr('action'),
					type: 'POST',
					data: $form.serialize(),					
					success: function(data){
						
						$formerror.toggle(!data.success)
						$formsuccess.toggle(data.success);

						$formButton
						.prop('disabled', false)
						.text(initialText)
						
					}
				})

				e.preventDefault();
			});
		}
	}

	/* Material form */

	OLA.materialForm = {
		init: function(){

			var $input = $('.input-control');
            var klass = '.input-control';
            var $body = $('body');

            /* On Load */

            $input.each(function(){
                
                if($(this).val()) $(this).parent().addClass('has-value')
            })
            
            /* On Blur */
            $body.on('blur change', klass, function(){                
                
                var $this = $(this),
                    $control = $this.parent();
                
                if(!this.value) {
                    $control.removeClass('label-up')
                }                

                $control.addClass('label-blur')
            });

            $body.on('keyup', klass, function(){
                var $this = $(this),
                    $control = $this.parent();

                if(this.value){
                    
                    $control.addClass('label-up').removeClass('label-blur')
                }
            })

            /* Trigger refresh */

            $body.on('refresh', klass, function(){

                var $this = $(this),
                    $control = $this.parent();

                if(this.value) $control.addClass('label-up label-blur')
            });

            /* On Blur */

            $body.on('focus', klass, function(){
                
                var $this = $(this),
                    $control = $this.parent();
                
                $control.addClass('label-up')
                $control.removeClass('label-blur')
            })
		}
	};

	/* Init material form */

	OLA.materialForm.init();
	OLA.signupForm.init();
	window.sr = new scrollReveal();

});