;(function() {

	let form = document.forms.personData;
	let selct = form.elements.themMessage;
	let nam = form.elements.name;
	let eml = form.elements.email;
	let mes = form.elements.mess;
	let flag = true;



	form.addEventListener('submit', finishValid, false);
	selct.addEventListener('focusout', validSel, false);
	nam.addEventListener('focusout', validNam, false);
	eml.addEventListener('focusout', validEml, false);
	mes.addEventListener('focusout', validMes, false);
	selct.addEventListener('focus', validClear, false);
	nam.addEventListener('focus', validClear, false);
	eml.addEventListener('focus', validClear, false);
	mes.addEventListener('focus', validClear, false);


	function finishValid(e) {
		e.preventDefault();
		e.stopPropagation();
		
		flag = true;

		validClear(e, selct);
		validClear(e, nam);
		validClear(e, eml);
		validClear(e, mes);
		validSel();
		validNam();
		validEml();
		validMes();

		if (flag) form.submit();
	}


	function validSel(e) {
		let infSel = 'Нажмите на выпадающий список "Тема сообщения" и выберите нужный вариант.';

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (!selct.selectedIndex) {
			
			flag = false;
			createInfoWin(selct, infSel);
		}
	}

	function validNam(e) {
		let infNam = 'Заполните поле в русской раскладке клавиатуры без пробелов и знаков препинания. Максимальная длина имени составляет 20 символов.';
		let re = new RegExp(/[а-я]\s[а-я]|[a-z]|\.|\!/, 'i');

		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if (!nam.value || re.test(nam.value) || nam.value.length > 20 ) {
			flag = false;
			createInfoWin(nam, infNam);
		}
	}

	function validEml(e) {
		let infEml = 'Заполните поле электронной почты, согласно шаблона <strong>"хххxxxхх@хххх.ххх"</strong>';
		let re = new RegExp(/^[^@]+@[^@.]+\.[^@]+$/);
		
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}

		if ( !eml.value || !re.test(eml.value) ) {
			flag = false;
			createInfoWin(eml, infEml);
		}
	}

	function validMes(e) {
		let infMes = 'Заполните поле в русской раскладке клавиатуры. Максимальная длина сообщения составляет 200 символов';
		let re = new RegExp(/[a-z]/, 'i');

		if ( e ) {
			e.preventDefault();
			e.stopPropagation();
		}

		if ( !mes.value || re.test(infMes) || mes.value.length > 200 ) {
			flag = false;
			createInfoWin(mes, infMes);
		}
	}


	function validClear(e, link) {
		let ln = link || this;

		e.preventDefault();
		e.stopPropagation();

		if ( ln.offsetParent.children.length > 1 ) {
			ln.offsetParent.removeChild(ln.offsetParent.lastChild);
			ln.className = 'elemform normal';
		}
	}


	function createInfoWin(link, info) {
		let win = document.createElement('div');
		let winpointer = document.createElement('div');

		win.innerHTML = info;
		link.parentNode.appendChild(win);
		win.appendChild(winpointer);
		winpointer.className = 'pointer';
		win.className = 'infoWin';
		link.className = 'elemform alarm';
	}

	window.fvf = finishValid;
}());