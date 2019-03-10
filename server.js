const express=require('express');

const fs=require('fs');
const hbs=require('hbs');

const app=express();

const port = process.env.PORT || 3000;
app.set('view engine','hbs');

hbs.registerPartials(__dirname + '/views/partial')




app.use((req,res,next)=>{
	let time=new Date().toString();
	let log=`${time}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err) {throw err;
		console.log('file is not complete');}
	})
	console.log(log);
	next();
})

/*app.use((req,res,next)=>{
	res.render('maintain.hbs')
})*/

app.use(express.static(__dirname + '/public'));
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title:'about page',
		currentyear: new Date().getFullYear()
	});
});

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title:'home page',
		currentyear:new Date().getFullYear()
	});
});

app.get('/project',(req,res)=>{
	res.render('project.hbs',{
		title:'project page',
		currentyear:new Date().toString()
	})
})



app.listen(port,()=>{
	console.log(`port is running in ${port}`);
});