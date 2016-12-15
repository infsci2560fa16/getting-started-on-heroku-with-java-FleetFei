$(document).ready(function() {
	//adimin test
	$("#test").click(function() {
		
		$(".admin_btn").show();
		$(".admin_form").show();
	});

	//cart add test
	$(".fa.fa-shopping-cart").click(function() {
		//check if 1st time to clcik button

		$("#cart").show();
		//get all the tr
		var cartTable = $('#cartTable');
		var inner = $(this).parent().parent();
		var price = inner.find(".ct-product-price");
		var title = inner.find(".ct-product-title");
		var imgsrc=inner.find("");
		$(this).data('clicked', true);
		if($(this).data('clicked')) {
			alert("product your choose is "+$(this).attr('id'));

			//find parent, so add the children to the cart

			var cart = $(".ct-cart").find("table");
			var tprice = $("<td><tr></tr></td>").text("price=" + price.text());

			var $atr = $('<tr>');
			var $atd = $('');
			var htmlString = ""; //  Content to be added to new div

			htmlString +=
				'<tr>' +
				'<td class = "checkbox_cartable"><input class="check-one check" type="checkbox" /></td>' +
				'<td class="goods"><span>' + title.text() + '</span></td>' +
				'<td class="price">'+price.text() +'</td>' +
				'<td class="count">' +
				'<span class="reduce"></span>' +
				'<input class="count-input" type="text" value="1" />' +
				'<span class="add">+</span>' +
				'</td>' +
				'<td class="subtotal">'+price.text()+'</td>' +
				'<td class="operation"><span class="delete">delete</span></td>' +
				'</tr>';

			cartTable.find('tbody').append(htmlString);

		}

	});
});
window.onload = function() {
//
	var cartTable = document.getElementById('cartTable');
	var tr = cartTable.children[1].rows;
	var checkInputs = document.getElementsByClassName('check');
	var checkAllInputs = document.getElementsByClassName('check-all');
	var selectedTotal = document.getElementById('selectedTotal');
	var priceTotal = document.getElementById('priceTotal');
	var selected = document.getElementById('selected');
	var foot = document.getElementById('cartfoot');
	var selectedViewList = document.getElementById('selectedViewList');
	var deleteAll = document.getElementById('deleteAll');

	//calculate
	function getTotal() {
		
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		var cartTable = document.getElementById('cartTable');
		var tr = cartTable.children[1].rows;
//		for(var i = 0, len = tr.length; i < len; i++) {
//			
//			
//				
//				tr[i].className = 'on';
//				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
//				price += parseFloat(tr[i].cells[4].innerHTML);
//				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
//			
//		}

		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = HTMLstr;

		if(seleted === 0) {
			foot.className = 'cartfoot';
		}
	}

	//toal
	function getSubTotal(tr) {
		
		var tds = tr.parent().parent();
		
		var price = parseFloat(tds.find(".price").html());
		var count = parseInt(tr.parent().find('.count-input').attr('value'));
		var SubTotal = parseFloat(price * count);
		tds.find('.subtotal').html(SubTotal);
	}

	
		
	

	selected.onclick = function() {
		if(foot.className == 'foot') {
			if(selectedTotal.innerHTML !== 0) {
				foot.className = 'foot show';
			}
		} else {
			foot.className = 'foot';
		}
	};

	selectedViewList.onclick = function(e) {
		e = e || window.event;
		var el = e.srcElement;
		if(el.className == 'del') {
			var index = el.getAttribute('index');
			var input = tr[index].getElementsByTagName('input')[0];
			input.checked = false;
			input.onclick();
		}
	};

	//               
	///jQ

	//reduce
	$(document).on('click',"#cartTable tbody tr td .reduce",function() {
		var inputC = $(this).parent().find('.count-input');
		var reduce = $(this).parent().find('.reduce');

		var val = parseInt(inputC.attr('value'));

		if(val > 1) {
			inputC.attr('value', val - 1);
		}
		if(val == 1) {
			inputC.attr('value', val - 1);
			reduce.html('');
		}
		getSubTotal($(this));
			getTotal();

	});
	//add
	$(document).on('click',"#cartTable tbody tr td .add",function() {
		var inputC = $(this).parent().find('.count-input');
		var val = parseInt(inputC.attr('value'));
		var reduce = $(this).parent().find('.reduce');
		inputC.attr('value', val + 1);
		reduce.html('-');
		getSubTotal($(this));
		getTotal();
	});
	//delete
	$(document).on('click',"#cartTable tbody tr td .delete",function() {
			var conf = confirm('delete Yes？');
			if(conf) {
				$(this).parent().parent().remove();
			}
				getTotal();
	});
	//check all
	$(document).on('click','.check-all ',function(){
//			alert($(".checkbox").length);
			
			$(".checkbox").prop('checked',true);
	});
	$(".fr.closing").click(function(){
		var conf=confirm('check out ?');
		if(conf){
			document.location.href = "index.html";
		}
	});
	checkAllInputs[0].checked = true;
//	checkAllInputs[0].onclick();
};