;(function() {

	let form = document.forms.personData;
	let selct = form.elements.options;
	let nam = form.elements.name;
	let eml = form.elements.email;
	let mes = form.elements.mess;
	let flag = true;



	form.addEventListener('submit', validationOnSubmit, false);
	selct.addEventListener('focusout', validationSelect, false);
	nam.addEventListener('focusout', validationText, false);
	eml.addEventListener('focusout', validationEmail, false);
	mes.addEventListener('focusout', validationTextarea, false);
	selct.addEventListener('focus', clearInfoWindow, false);
	nam.addEventListener('focus', clearInfoWindow, false);
	eml.addEventListener('focus', clearInfoWindow, false);
	mes.addEventListener('focus', clearInfoWindow, false);


	function validationOnSubmit(e) {
		e.preventDefault();
		e.stopPropagation();
		
		flag = true;

		clearInfoWindow(e, selct);
		clearInfoWindow(e, nam);
		clearInfoWindow(e, eml);
		clearInfoWindow(e, mes);
		validationSelect();
		validationText();
		validationEmail();
		validationTextarea();

		if (flag) form.submit();
	}


	function validationSelect(e) {
		let infSel = 'Нажмите на выпадающий список "Тема сообщения" и выберите нужный вариант.';

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (!selct.selectedIndex) {
			
			flag = false;
			createInfoWindow(selct, infSel);
		}
	}

	function validationText(e) {
		let infNam = 'Заполните поле в русской раскладке клавиатуры без пробелов и знаков препинания. Максимальная длина имени составляет 20 символов.';
		let re = new RegExp(/[а-я]\s[а-я]|[a-z]|\.|\!/, 'i');

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (!nam.value || re.test(nam.value) || nam.value.length > 20 ) {
			flag = false;
			createInfoWindow(nam, infNam);
		}
	}

	function validationEmail(e) {
		let infEml = 'Заполните поле электронной почты, согласно шаблона <strong>"хххxxxхх@хххх.ххх"</strong>';
		let re = new RegExp(/^[^@]+@[^@.]+\.[^@]+$/);
		
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if ( !eml.value || !re.test(eml.value) ) {
			flag = false;
			createInfoWindow(eml, infEml);
		}
	}

	function validationTextarea(e) {
		let infMes = 'Заполните поле в русской раскладке клавиатуры. Максимальная длина сообщения составляет 200 символов';
		let re = new RegExp(/[a-z]/, 'i');

		if ( e ) {
			e.preventDefault();
			e.stopPropagation();
		}

		if ( !mes.value || re.test(infMes) || mes.value.length > 200 ) {
			flag = false;
			createInfoWindow(mes, infMes);
		}
	}


	function clearInfoWindow(e, link) {
		let ln = link || this;

		e.preventDefault();
		e.stopPropagation();

		if ( ln.offsetParent.children.length > 1 ) {
			ln.offsetParent.removeChild(ln.offsetParent.lastChild);
			ln.className = 'elem-form normal';
		}
	}


	function createInfoWindow(link, info) {
		let win = document.createElement('div');
		let winpointer = document.createElement('div');

		win.innerHTML = info;
		link.parentNode.appendChild(win);
		win.appendChild(winpointer);
		winpointer.className = 'pointer';
		win.className = 'info-window';
		link.className = 'elem-form alarm';
	}

	window.fvf = finishValid;
}());