let keyWords=['add','sub','mply','div','is','greater','lesser','equals','and','or','not','here','always','show','provided','aslongas'];
const constants={};
let variables={};
function operator(str,a,b)
{
		let str1;
		let str2;
		if (a in variables)
				str1='variables.';
		else if (a in constants)
				str1='constants.';
		else if (isNaN(parseInt(a)))
				console.log('Error! '+a+' is not declared');
		if (b in variables)
				str2='variables.';
		else if (b in constants)
				str2='constants.';
		else if (isNaN(parseInt(b)))
				console.log('Error! '+b+' is not declared');
		if (isNaN(parseInt(a))&&isNaN(parseInt(b)))
		{
				if (str=='add')
				        return  eval(str1 + a) + eval(str2 + b);
		        else if (str=='sub')
						return  eval(str1 + a) - eval(str2 + b);
		        else if (str=='mply')
		                return  eval(str1 + a) * eval(str2 + b);
				else if (str=='div')
						return  eval(str1 + a) / eval(str2 + b);
			    else if (str=='greaterthan')
		                return  eval(str1 + a) > eval(str2 + b);
				else if (str=='lesserthan')
						return  eval(str1 + a) < eval(str2 + b);
				else if (str =='equals')
						return  eval(str1 + a) == eval(str2 + b);
				else if (str =='notequals')
						return  eval(str1 + a) != eval(str2 + b);
		}
		else if(isNaN(parseInt(a)) && !(isNaN(parseInt(b))))
	    {
		        if (str=='add')
				        return eval(str1 + a) + parseInt(b);
				else if (str=='sub')
						return eval(str1 + a) - parseInt(b);
		        else if (str=='mply')
				        return eval(str1 + a) * parseInt(b);
				else if (str=='div')
						return eval(str1 + a) / parseInt(b);
		        else if (str=='greaterthan')
				        return eval(str1 + a) > parseInt(b);
				else if (str=='lesserthan')
						return eval(str1 + a) < parseInt(b);
				else if (str =='equals')
						return eval(str1 + a) == parseInt(b);
				else if (str =='not equals')
						return eval(str1 + a) != parseInt(b);
		}
        else if(!isNaN(parseInt(a))&&!isNaN(parseInt(b)))
		{
		        if (str=='add')
				        return parseInt(a) + parseInt(b);
				else if (str=='sub')
				        return parseInt(a) - parseInt(b);
		        else if (str=='mply')
						return parseInt(a) * parseInt(b);
			 	else if (str=='div')
				        return parseInt(a) / parseInt(b);
		        else if (str=='greaterthan')
						return parseInt(a) > parseInt(b);
		        else if (str=='lesserthan')
				        return parseInt(a) < parseInt(b);
				else if (str =='equals')
						return parseInt(a) == parseInt(b);
				else if (str =='notequals')
						return parseInt(a) != parseInt(b);
		}
		else 
				console.log('Error!!!')
}
function generateVar(str,val)
{
		if (keyWords.indexOf(str)==-1 && str in constants)
				console.log('Error! Cannot change the value of an always variable')
		else if(keyWords.indexOf(str)==-1 && !(str in constants))
				eval("variables."+ str +" = " + val);
		else 
				console.log("Syntax Error "+str+" is a keyword");
}
function generateCon(str,val)
{
		if(keyWords.indexOf(str)==-1 && !(str in constants) && !(str in variables))
				eval("constants."+ str +" = " + val);
		else if (keyWords.indexOf(str)==-1 && str in constants)
				console.log('Error! Cannot change the value of an always variable')
		else if (keyWords.indexOf(str)==-1 && str in variables)
				console.log('Error '+str+' is already declared');
		else
				console.log("Syntax Error "+str+" is a keyword");
}
function assign(stri)
{
		let arr=stri.split(" ");
		if (arr[0]=='here'&&arr[2]=='is')
		{
				if(!isNaN(parseInt(arr[3])))
				generateVar(arr[1],parseInt(arr[3]));
				else 
				generateVar(arr[1],operator(arr[3],arr[4],arr[5]));
		} 
		else if(arr[0]=='always'&&arr[2]=='is')
		{
				if(!isNaN(parseInt(arr[3])))
						generateCon(arr[1],parseInt(arr[3]));
				else 
						generateCon(arr[1],operator(arr[3],arr[4],arr[5]));
		}
		else if (arr[0] in variables && arr[1]=='is')
		{
				generateVar(arr[0],operator(arr[2],arr[3],arr[4]))
		}
		else if (arr[0]=='show')
		{
				if (arr[1] in variables)
						console.log(eval("variables."+arr[1]));
				else if (arr[1] in constants)
						console.log(eval("constants."+arr[1]));
				else if (keyWords.includes(arr[1]))
				{
						arr.shift();
						console.log(operator(arr[0],arr[1],arr[2]));
				}
				else if (typeof arr[1]== 'string')
						console.log(arr[1]);
				else 
						console.log('undefined');
		}
}
function multiple(cmd)
{
		let arra=cmd.split(' and ');
		let arror=cmd.split('or');
		let val=true;
		if (arra.length==1&&arror.length==1)
		{
				let spli=arra[0].split(' ');
				val = val && operator(spli[1],spli[0],spli[2]);
		}
		else if (arror.length!=1)
		{
				for(let i=0;i<arror.length;i++)
				{
						let spli=arror[i].split(' ')
						val=val || operator(spli[1],spli[0],spli[2]);
				}
		}
		for(let i=0;i<arra.length-1;i++)
        {
                let spli=arra[i].split(' ');
                val=val && operator(spli[1],spli[0],spli[2]);
        }
		let arro=arra[arra.length-1].split('or');
		if (arro.length==1)
		{
				let spli=arro[0].split(' ');
				val=val && operator(spli[1],spli[0],spli[2]);
		}
		else 
		{
				for(let i=0;i<arro.length;i++)
				{
						let spli=arro[i].split(' ');
						val=val || operator(spli[1],spli[0],spli[2]);
				}
		}
		return val;
}
function condition(cmd)
{
		let arr=cmd.split('-');
		if (arr[2]==undefined)
		{
				if (multiple(arr[0]))
				{
						let arr2=arr[1].split(',');
						arr2.forEach(c);
				}
		}
		else if (arr[2]=='ifnot' && arr[3]!=undefined)
		{
				if (multiple(arr[0]))
				{
						let arr4=arr[1].split(',');
						arr4.forEach(c);
				}
				else 
				{
						let arr5=arr[3].split(',');
						arr5.forEach(c);
				}
		}
}
function loop(cmd)
{
		let arr=cmd.split('-');
		let arr1=arr[0].split(';');
		let arr2=arr[1].split(',');
		for (c(arr1[0]);multiple(arr1[1]);c(arr1[2]))
			arr2.forEach(c)
}
function c(strin)
{
		let arr=strin.split('_')
		if(arr.length ==1)
				assign(strin);
		else if (arr[0] == 'provided')
				condition(arr[1]);
		else if (arr[0] == 'aslongas')
				loop(arr[1])
		else 
				console.log('Syntax Error!!!')
}
function comp(str)
{
		let arr=str.split('.');
		arr.forEach(c)
}
c('here x is 5 .');
c('here y is 7 .');
c('here z is add x y .');
c('show sub z x .');
c('provided_y greaterthan x and y lesserthan 10-here v is 15 ,here w is 10 ,show add v w , -ifnot-here v is 15 ,here w is 5 ,show sub v w , - .');
c('aslongas_here a is 0;a lesserthan 5;a is add a 1-show a- .')
comp('here x is 5 .here y is 7 .here z is add x y .show sub z x .provided_y greaterthan x and y lesserthan 10-here v is 15 ,here w is 10 ,show add v w , -ifnot-here v is 15 ,here w is 5 ,show sub v w , - .aslongas_here a is 0;a lesserthan 5;a is add a 1-show a- .');
