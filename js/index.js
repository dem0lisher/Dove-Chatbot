$(document).ready(function(){
	
	// if(navigator.geolocation){
	// 	navigator.geolocation.getCurrentPosition(
	// 		function(){
	// 			console.log('geolocation not enabled in browser');
	// 		},function(){
	// 			console.log('geolocation not enabled in browser');
	// 		}
	// 	);
	// }else{
	// 	console.log('geolocation not enabled in browser');
	// }

	// var increaseQuesNo = (function(){
	// 	var questionNo = 0;
	// 	return function(){
	// 		questionNo++;
	// 	}
	// })();

	var questionNo;
	load();

	function load(){
		setTimeout(function(){
			$('#splash-screen').addClass('hidden');
		}, 3000);
		$('#input-submit-btn').click(function(e){
			var answer = $('#user-input').val();
			if(answer){
				postAnswer(answer);
				handleInput(e, answer.toLowerCase());
			}
		});
		questionNo = 1;
		var chatOutputSection = $('#chat-output-section'), response = '';
		response = `
			<div class="message flex-row flex-start">
				<div class="bot-msg flex-row flex-center">
					Hi how are you
				</div>
			</div>
		`;
		sendResponse(chatOutputSection, response);
	}

	function postAnswer(answer){
		var chatOutputSection = $('#chat-output-section');
		var post = `
			<div class="message flex-row flex-end">
				<div class="user-msg flex-row flex-center">
					` + answer + `
				</div>
			</div>
		`;
		chatOutputSection.append(post);
		$('#user-input').val('');
	}

	function sendResponse(chatOutputSection, response){
		chatOutputSection.append(response);
	}

	function handleInput(e, answer){
		e.preventDefault();
		var chatOutputSection = $('#chat-output-section'), response = '';
		switch(questionNo){
			case 1:
				if(answer === 'oily' || answer === 'dull'){
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								How many times do you wash your hair?
							</div>
						</div>
					`;
					questionNo++;
					sendResponse(chatOutputSection, response);
				}
				else if(answer === 'good'){
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								That is great!
							</div>
						</div>
					`;
					sendResponse(chatOutputSection, response);
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								I recommend you use dove oxygen moisture for even better results.
							</div>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(chatOutputSection, response);
					}, 2000);
					var video = `
						<div class="message flex-row flex-start">
							<iframe src="https://www.youtube.com/watch?v=wsoN2C0JzWk&autoplay=1" width="200px" height="200px"></iframe>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(chatOutputSection, video);
					}, 4000);
				}
				else{
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								I'm sorry I didn't get that
							</div>
						</div>
					`;
					sendResponse(chatOutputSection, response);
				}
			break;
			case 2:
				if(answer <= 7){
					var response1 = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								Washing your hair ` + answer + ` times per week when it is oily is not healthy
							</div>
						</div>
					`;
					sendResponse(chatOutputSection, response1);
					var response2 = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								I recommend you use dove oil control shampoo
							</div>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(chatOutputSection, response2);
					}, 2000);
					var response3 = `
						<div class="flex-row" id="carousal-ctn">
							<div class="carousal-img-ctn"><img src="./img/dandruff.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
							<div class="carousal-img-ctn"><img src="./img/hairfall.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
							<div class="carousal-img-ctn"><img src="./img/nourish-black.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
							<div class="carousal-img-ctn last-img-ctn"><img src="./img/nourish-oil.jpg" class="carousal-img" alt="Dove Shampoo" /></div>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(chatOutputSection, response3);
					}, 4000);
				}
				else if(answer > 7){
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								Washing your hair ` + answer + ` times per week when it is dull is not healthy
							</div>
						</div>
					`;
					sendResponse(chatOutputSection, response);
				}
				else{
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								I'm sorry I didn't get that
							</div>
						</div>
					`;
					sendResponse(chatOutputSection, response);
					response = `
						<div class="message flex-row flex-start">
							<div class="bot-msg flex-row flex-center">
								How many times do you wash your hair?
							</div>
						</div>
					`;
					setTimeout(function(){
						return sendResponse(chatOutputSection, response);
					}, 2000);
				}
			break;
		}
	}

});