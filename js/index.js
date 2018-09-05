$(document).ready(function(){

	var questionNo, userLocation = '', userLocationTemp = 0;
	load();

	function load(){
		getUserLocation();
		setTimeout(function(){
			$('#splash-screen').fadeOut(1000);
			var indicator = getTypingIndicator();
			$('#chat-output-section').append(indicator);
		}, 2000);
		$('#input-submit-btn').click(function(e){
			var answer = $('#user-input').val();
			if(answer){
				postAnswer(answer);
				handleInput(e, answer.toLowerCase());
			}
		});
		questionNo = 1;
	}

	function getUserLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
				function(position){
					$.ajax({
						url: 'https://api.openweathermap.org/data/2.5/weather',
						type: 'GET',
						data: {appid: '2ca846983b4bffca4a1f3aaa3e9465b5', lat: position.coords.latitude, lon: position.coords.longitude}
					}).then(
						function(data){
							if(data.main && data.main.temp && data.name){
								userLocation = data.name;
								userLocationTemp = parseFloat(data.main.temp) - 273.15;
								var response = getBotMsgTemplate('Hi, it is ' + userLocationTemp + ' degrees outside in ' + userLocation + '. How is your hair feeling?');
							}
							else{
								var response = getBotMsgTemplate('Hi. How is your hair feeling?');	
							}
							sendResponse(response, false);
						},function(){
							var response = getBotMsgTemplate('Hi. How is your hair feeling?');
							sendResponse(response, false);
						}
					)
				},function(){
					var response = getBotMsgTemplate('Hi. How is your hair feeling?');
					sendResponse(response, false);
				}
			);
		}
		else{
			var response = getBotMsgTemplate('Hi. How is your hair feeling?');
			sendResponse(response, false);
		}
	}

	function getTypingIndicator(){
		var template = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
		return template;
	}

	function getUserMsgTemplate(msg){
		var template = `
			<div class="message flex-row flex-end">
				<div class="user-msg flex-row flex-center">
					` + msg + `
				</div>
			</div>
		`;
		return template;
	}

	function getBotMsgTemplate(msg){
		var template = `
			<div class="message flex-row flex-start">
				<div class="bot-msg flex-row flex-center">
					` + msg + `
				</div>
			</div>
		`;
		return template;
	}

	function getCarousalTemplate(){
		var template = `
			<div class="flex-row" id="carousal-ctn">
				<div class="carousal-img-ctn"><img src="./img/dandruff.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
				<div class="carousal-img-ctn"><img src="./img/hairfall.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
				<div class="carousal-img-ctn"><img src="./img/nourish-black.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
				<div class="carousal-img-ctn last-img-ctn"><img src="./img/nourish-oil.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
			</div>
		`;
		return template;
	}

	function postAnswer(answer){
		var chatOutputSection = $('#chat-output-section');
		var post = getUserMsgTemplate(answer);
		chatOutputSection.append(post);
		chatOutputSection.scrollTop(chatOutputSection.height());
		$('#user-input').val('');
		setTimeout(function(){
			var indicator = getTypingIndicator();
			chatOutputSection.append(indicator);
			chatOutputSection.scrollTop(chatOutputSection.height());
		}, 500);
	}

	function sendResponse(response, showTypingIndicator){
		var chatOutputSection = $('#chat-output-section');
		$('.typing-indicator').remove();
		chatOutputSection.append(response);
		chatOutputSection.scrollTop(chatOutputSection.height());
		if(showTypingIndicator){
			setTimeout(function(){
				var indicator = getTypingIndicator();
				chatOutputSection.append(indicator);
				chatOutputSection.scrollTop(chatOutputSection.height());
			}, 500);
		}
	}

	function handleInput(e, answer){
		e.preventDefault();
		var chatOutputSection = $('#chat-output-section');
		switch(questionNo){
			case 1:
				if(answer === 'oily' || answer === 'dull'){
					questionNo++;
					var response1 = getBotMsgTemplate('How many times do you wash your hair?');
					setTimeout(function(){
						return sendResponse(response1, false);
					}, 2000);
				}
				else if(answer === 'good'){
					var response1 = getBotMsgTemplate('That is great!');
					setTimeout(function(){
						return sendResponse(response1, true);
					}, 2000);
					var response2 = getBotMsgTemplate('I recommend you use dove oxygen moisture for even better results.');
					setTimeout(function(){
						return sendResponse(response2, true);
					}, 4000);
					var response3 = `
						<div class="message flex-row flex-start">
							<iframe src="https://www.youtube.com/embed/wsoN2C0JzWk?autoplay=1" width="88%" frameborder="0" allowfullscreen></iframe>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(response3, false);
					}, 6000);
				}
				else{
					var response1 = getBotMsgTemplate('I\'m sorry I didn\'t get that');
					setTimeout(function(){
						return sendResponse(response1, true);
					}, 2000);
					if(userLocationTemp && userLocation){
						var response2 = getBotMsgTemplate('Hi, it is ' + userLocationTemp + ' degrees outside in ' + userLocation + '. How is your hair feeling?');
					}
					else{
						var response2 = getBotMsgTemplate('Hi. How is your hair feeling?');
					}
					setTimeout(function(){
						return sendResponse(response2, false);
					}, 4000);
				}
			break;
			case 2:
				if(answer <= 7){
					questionNo++;
					var response1 = getBotMsgTemplate('Washing your hair ' + answer + ' times per week when it is oily is not healthy');
					setTimeout(function(){
						return sendResponse(response1, true);
					}, 2000);
					var response2 = getBotMsgTemplate('I recommend you use dove oil control shampoo');
					setTimeout(function(){
						return sendResponse(response2, true);
					}, 4000);
					var response3 = getCarousalTemplate();
					setTimeout(function(){
						return sendResponse(response3, false);
					}, 6000);
				}
				else if(answer > 7){
					questionNo++;
					var response1 = getBotMsgTemplate('Washing your hair ' + answer + ' times per week when it is dull is not healthy');
					setTimeout(function(){
						return sendResponse(response1, true);
					}, 2000);
					var response2 = getBotMsgTemplate('I recommend you use dove daily shine shampoo');
					setTimeout(function(){
						return sendResponse(response2, true);
					}, 4000);
					var response3 = getCarousalTemplate();
					setTimeout(function(){
						return sendResponse(response3, false);
					}, 6000);
				}
				else{
					var response1 = getBotMsgTemplate('I\'m sorry I didn\'t get that');
					setTimeout(function(){
						return sendResponse(response1, true);
					}, 2000);
					var response2 = getBotMsgTemplate('How many times do you wash your hair?');
					setTimeout(function(){
						return sendResponse(response2, false);
					}, 4000);
				}
			break;
			default:
				questionNo = 1;
				var response1 = getBotMsgTemplate('I\'m sorry I didn\'t get that');
				setTimeout(function(){
					return sendResponse(response1, true);
				}, 2000);
				if(userLocationTemp && userLocation){
					var response2 = getBotMsgTemplate('Hi, it is ' + userLocationTemp + ' degrees outside in ' + userLocation + '. How is your hair feeling?');
				}
				else{
					var response2 = getBotMsgTemplate('Hi. How is your hair feeling?');
				}
				setTimeout(function(){
					return sendResponse(response2, false);
				}, 4000);
			break;
		}
	}
});