function myFunction()
{
	var underlyingPrice=document.getElementById("txtUnderlyingPrice").value;
	alert(underlyingPrice);
}

function isNumberKey(evt)
       {
          var charCode = (evt.which) ? evt.which : event.keyCode;
          if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57))
             return false;

          return true;
       }

function cleardata()
{
	
	

		var linkCalculate=document.getElementById("btnCalculate");
		linkCalculate.style.visibility='visible';
		linkCalculate.style.display = 'block';
	
		var linkClear=document.getElementById("btnClear");
		linkClear.style.visibility='hidden';
		linkClear.style.display = 'none';
		
		var divContent = document.getElementById("divContent");
		divContent.style.visibility = 'visible';
		divContent.style.display = 'block';
		
		var divVol = document.getElementById("divVol");
		divVol.style.visibility = 'hidden';
		divVol.style.display = 'none';
}
		
		

function calculate()
{
	
		var linkClear=document.getElementById("btnClear");
		linkClear.style.visibility='visible';
		linkClear.style.display = 'block';
		
		var linkCalculate=document.getElementById("btnCalculate");
		linkCalculate.style.visibility='hidden';
		linkCalculate.style.display = 'none';
	
		var underlyingPrice=document.getElementById("txtUnderlyingPrice").value;
		var exercisePrice=document.getElementById("txtExercisePrice").value;
		var optionRate=document.getElementById("txtOptionRate").value;
		var daysToExpiry=document.getElementById("txtDays").value;
		var intRate=document.getElementById("txtInterestRate").value;
		var divident=document.getElementById("txtDividend").value;
		
		if(daysToExpiry<=0)
		{
			alert("Day to Expiry can not be less than or equal to 0!!!");
			return;
		}
		
		var callIV=ImpliedCallVolatility(underlyingPrice,exercisePrice,daysToExpiry,intRate, optionRate,divident);
		var putIV=ImpliedPutVolatility(underlyingPrice,exercisePrice,daysToExpiry,intRate, optionRate,divident);
	
		var divContent = document.getElementById("divContent");
		divContent.style.visibility = 'hidden';
		divContent.style.display = 'none';
		
		var divVol = document.getElementById("divVol");
		divVol.style.visibility = 'visible';
		divVol.style.display = 'block';
		
		document.getElementById("txtCallVol").value=callIV;
		document.getElementById("txtPutVol").value=putIV;
	
		
}

function ImpliedCallVolatility(dblUnderlyingPriceVal,
			dblExercisePriceVal, dblTimeVal,
			dblInterestVal, dblTargetVal, dblDividendVal)
	{
		var High = 5;
		var Low = 0;

		do {
			if (CallOption(dblUnderlyingPriceVal, dblExercisePriceVal,
					dblTimeVal, dblInterestVal, (High + Low) / 2,
					dblDividendVal) > dblTargetVal) {
				High = (High + Low) / 2;
			} else {
				Low = (High + Low) / 2;
			}
		} while ((High - Low) > 0.0001);
		var resultImpliedCallVolatility = (High + Low) / 2;
		return resultImpliedCallVolatility;

	}

function CallOption(dblUnderlyingPriceVal,
			dblExercisePriceVal, dblTimeVal,
			dblInterestVal, VolatilityVal, dblDividendVal) {

		var dOneVal = dOne(dblUnderlyingPriceVal, dblExercisePriceVal,
				dblTimeVal, dblInterestVal, VolatilityVal, dblDividendVal);

		var CNDvalwithdOne = CND(dOneVal);
		var resultCallOption=0,txt;
		
		try
		{
			resultCallOption = Math.exp(-dblDividendVal * dblTimeVal)
				* dblUnderlyingPriceVal
				* CNDvalwithdOne
				- dblExercisePriceVal
				* Math.exp(-dblInterestVal * dblTimeVal)
				* CND(dOne(dblUnderlyingPriceVal, dblExercisePriceVal,
						dblExercisePriceVal, dblInterestVal, VolatilityVal,
						dblDividendVal)
						- VolatilityVal * Math.sqrt(dblTimeVal));
		}
		catch(err)
		{
			  	txt="There was an error on this page.\n\n";
  				txt+="Error description: " + err.message + "\n\n";
  				txt+="Click OK to continue.\n\n";
  				alert(txt);
		}
		return resultCallOption;
	}


function ImpliedPutVolatility(dblUnderlyingPriceVal,
			dblExercisePriceVal, dblTimeVal,
			dblInterestVal, dblTargetVal, dblDividendVal)


	{
		var High = 5;
		var Low = 0;

		do {
			if (putOption(dblUnderlyingPriceVal, dblExercisePriceVal,
					dblTimeVal, dblInterestVal, (High + Low) / 2,
					dblDividendVal) > dblTargetVal) {
				High = (High + Low) / 2;
			} else {
				Low = (High + Low) / 2;
			}
		} while ((High - Low) > 0.0001);
		var resultImpliedPutVolatility = (High + Low) / 2;
		return resultImpliedPutVolatility;

	}

function putOption(dblUnderlyingPriceVal,
			dblExercisePriceVal, dblTimeVal,
			dblInterestVal, VolatilityVal, dblDividendVal) {

		var resultputOption=0,txt;
		try
		{
			resultputOption = dblExercisePriceVal
				* Math.exp(-dblInterestVal * dblTimeVal)
				* CND(-dTwo(dblUnderlyingPriceVal, dblExercisePriceVal,
						dblTimeVal, dblInterestVal, VolatilityVal,
						dblDividendVal))
				- Math.exp(-dblDividendVal * dblTimeVal)
				* dblUnderlyingPriceVal
				* CND(-dOne(dblUnderlyingPriceVal, dblExercisePriceVal,
						dblTimeVal, dblInterestVal, VolatilityVal,
						dblDividendVal));
		}
		catch(err)
		{
			  	txt="There was an error on this page.\n\n";
  				txt+="Error description: " + err.message + "\n\n";
  				txt+="Click OK to continue.\n\n";
  				alert(txt);
		}
		return resultputOption;
}


function dOne(dblUnderlyingPriceVal, dblExercisePriceVal, dblTimeVal,  dblInterestVal, VolatilityVal, dblDividendVal) 
{
		var resultdOne=0,txt;
		try
		{
		 		resultdOne =(Math.log(dblUnderlyingPriceVal / dblExercisePriceVal) + (dblInterestVal - dblDividendVal + 0.5 * (VolatilityVal * VolatilityVal))
				* dblTimeVal) / (VolatilityVal * (Math.sqrt(dblTimeVal)));
				
		}
		catch(err)
		{
			  	txt="There was an error on this page.\n\n";
  				txt+="Error description: " + err.message + "\n\n";
  				txt+="Click OK to continue.\n\n";
  				alert(txt);
		}
		return resultdOne;
}

function dTwo(dblUnderlyingPriceVal,
			dblExercisePriceVal, dblTimeVal,
			dblInterestVal, VolatilityVal, dblDividendVal) {
		// TODO Auto-generated method stub

		var resultdTwo=0,txt;
		try
		{
			resultdTwo = dOne(dblUnderlyingPriceVal, dblExercisePriceVal,
				dblTimeVal, dblInterestVal, VolatilityVal, dblDividendVal)
				- VolatilityVal * Math.sqrt(dblTimeVal);
		}
		catch(err)
		{
			  	txt="There was an error on this page.\n\n";
  				txt+="Error description: " + err.message + "\n\n";
  				txt+="Click OK to continue.\n\n";
  				alert(txt);
		}
		return resultdTwo;
}

function CND(dblValue) {

		var b1 = 0.31938153;
		var b2 = -0.356563782;
		var b3 = 1.781477937;
		var b4 = -1.821255978;
		var b5 = 1.330274429;
		var p = 0.2316419;
		var c2 = 0.3989423;
		var a;
		var t;
		var b;
		var n;

		if (dblValue > 6) {
			// 'This Guards from overflow
			return 1.0;

		} else if (dblValue < -6) {
			return 0.0;
		} // 'This Guards from underflow

		a = Math.abs(dblValue); // 'Computes Absolute Value
		t = 1.0 / (1.0 + a * p);
		b = c2 * Math.exp((-dblValue) * (dblValue / 2.0));
		n = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
		n = 1.0 - b * n;
		if (dblValue < 0.0) {
			n = 1.0 - n;
		}
		return n;

	}
