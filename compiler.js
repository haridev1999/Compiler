let keyWords=['add','sub','mply','div','modulus','is','greater','lesser','equals','and','or','not','here','always','show','provided','aslongas'];
const constants={};
let variables={};
function operator(str,a,b)
{
		let str1;
		let str2;
		let x;
		let y;
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
				x=eval(str1+a);
				y=eval(str2+b);
		}
		else if(isNaN(parseInt(a)) && !(isNaN(parseInt(b))))
	    {
				x=eval(str1+a);
				y=parseInt(b);
		}
		else if(!isNaN(parseInt(a))&&!isNaN(parseInt(b)))
		{
				x=parseInt(a);
				y=parseInt(b);
		}
		else 
				console.log('Error!!!')
		if (str=='add')
				return x+y;
		else if (str=='sub')
				return x-y;
		else if (str=='mply')
				return x*y;
		else if(str=='div')
				return x/y;
		else if (str=='modulus')
				return x%y;
		else if (str=='greaterthan')
				return x>y;
		else if (str=='lesserthan')
				return x<y;
		else if (str=='greaterthanequals')
				return x>=y;
		else if (str=='lesserthanequals')
				return x<=y;
		else if (str=='equals')
				return x==y;
		else if (str=='notequals')
				return x!=y;
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
		let arr=cmd.split('+');
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
		let arr1=arr[0].split(':');
		let arr1a=arr1[0].split(';')
		let arr1b=arr1[2].split(';')
		let arr2=arr[1].split(',');
		for (arr1a.forEach(c);multiple(arr1[1]);arr1b.forEach(c))
			arr2.forEach(c)
}
function c(strin)
{
		let arr=strin.split('_')
		let arro=strin.split('?')
		if(arr.length ==1&&arro.length==1)
				assign(strin);
		else if (arro[0] == 'provided')
				condition(arro[1]);
		else if (arr[0] == 'aslongas')
				loop(arr[1])
		else 
				console.log('Syntax Error!!!')
}
function comp(stri)
{
		let arr=stri.split('.');
		arr.forEach(c)
}
comp('here x is 5 .here y is 7 .here z is add x y .show sub z x .provided?y greaterthan x and y lesserthan 10+here v is 15 ,here w is 10 ,show add v w , +ifnot+here v is 15 ,here w is 5 ,show sub v w , + .aslongas_here a is 0:a lesserthan 5:a is add a 1-show a- .');
comp('aslongas_here i is 1:i lesserthan 4:i is add i 1-provided?i equals 2+show iAmTwo+ifnot+show notTwo+-.')
//comp('aslongas_here i is 0:i lesserthan 5:i is add i 1-here x is 0,aslongas_here j is 0:j lesserthan i:j is add j 1-here x is add x j-show x-');
