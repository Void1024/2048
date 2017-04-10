    var game=document.getElementById("game");
	var text=document.getElementById("text");

	if(game.getContext&&text.getContext)
	{
			var context=game.getContext("2d");
			var scoreText=text.getContext("2d");

			var width=context.canvas.width;
			var height=context.canvas.height;

			var blockLength=0.20*width;
			var marginLength=width*0.20*0.20;

			var end=false,main=false;
			//ar merge=true;

			var step=0,score=0;
			//var gameOver=false;
			var array=new Array();
			var lastArray;
			
			var set=false;
			var keyUp='W',keyDown='S',keyLeft='A',keyRight='D';
			var setW=false,setA=false,setD=false,setS=false;

			var startX,startY,endX,endY;

			{
				var textHeight=scoreText.canvas.height;
				var textWidth=scoreText.canvas.width;

			}


			{
				var mainMenuWidth=0.4*width;
				var mainMenuHeight=height/8;

				var mainMenuPosX=(width - mainMenuWidth)/2;
				var mainMenuPosY=0.5*width;

				var mainButton1=new Array(mainMenuPosX,mainMenuPosY,mainMenuWidth,mainMenuHeight);
				var mainButton2=new Array(mainMenuPosX,mainMenuPosY+mainMenuHeight+0.05*height,mainMenuWidth,mainMenuHeight);
			}

			{
				var menuWidth=0.6*width;
				var menuHeight=0.45*height;
				var menuX=(width-menuWidth)/2;
				var menuY=(height-menuHeight)/2;
				var endButton1=new Array(menuX+menuWidth/3,menuY+menuHeight/3,menuWidth/3,menuHeight/8);
				var endButton2=new Array(menuX+menuWidth/3,menuY+menuHeight/3+menuHeight/8+menuHeight/10,menuWidth/3,menuHeight/8);
			}
			mainMenu();
			
			//initialize();

			//gameOver();

			window.onkeydown = function(e)
			{
    			lastArray=array.toString();
    			//alert(lastArray);
    			var keynum, keychar,key;
    			if(window.event)       // IE
        			keynum = e.keyCode;
    
    			else if(e.which)       // Netscape/Firefox/Opera
    			    keynum = e.which;
    
    			keychar = String.fromCharCode(keynum);
    			if(setW)
    			{
    				keyUp=keychar;
    				setW=false;
    				setMenu();
    			}
    			else if(setS)
    			{
    				keyDown=keychar;
    				setS=false;
    				setMenu();
    			}
    			else if(setA)
    			{
    				keyLeft=keychar;
    				setA=false;
    				setMenu();
    			}
    			else if(setD)
    			{
    				keyRight=keychar;
    				setD=false;
    				setMenu();
    			}
    			else if(!set)
    			{
    			key=[keyUp,keyDown,keyLeft,keyRight].indexOf(keychar)
    			if(key > -1&&end==false&&main==false)
    			{
        			
        			if(key===0)
        			{
        				moveUp();
        				
        			}
        			else if(key===1)
        			{
        				moveDown();
        				
        			}
        			else if(key===2)
        			{
        				moveLeft();
        				
        			}
        			else if(key===3)
        			{
        				moveRight();
        				
        			}
        			
        			
        			context.clearRect(0,0,width,height);
        			scoreText.clearRect(0,0,scoreText.canvas.width,scoreText.canvas.height)
        			gameDraw();
        			scoreTextDraw(step,score);
        			
        			

        			if(isGameOver())
        				gameOver();
        			else if(isWin())
        				win();
       			}
       		}
   			}

   			text.onclick=function(e)
   			{
   				//alert(1); 
   				e=e||event;
   				var x=e.pageX-text.offsetLeft;
   				var y=e.pageY-text.offsetTop;

   				
   				{
   					//alert(2);
   					if(x>0&&y>textHeight-textWidth*0.3&&x<textWidth&&y<textHeight)
   						{
   							//alert(1);
   							//main=true;
   							mainMenu();
   						}
   				}
   			}
   			

   			game.onclick=function(e)
   			{
   				
   				e=e||event;
   				var x=e.pageX-game.offsetLeft;
   				var y=e.pageY-game.offsetTop;

   				


   				if(end===true)
   				{
   					
   					if(x>endButton1[0]&&y>endButton1[1]&&x<(endButton1[0]+endButton1[2])&&y<(endButton1[1]+endButton1[3]))
   						{
   							//alert(1);
   							end=false;
   							Again();
   						}
   					else if(x>endButton2[0]&&y>endButton2[1]&&x<(endButton2[0]+endButton2[2])&&y<(endButton2[1]+endButton2[3]))
   						{
   							//alert(2);
   							end=false;
   							mainMenu();

   						}
   				}

   				else if(main===true)
   				{
   					//alert(1);
   					if(x>mainButton1[0]&&y>mainButton1[1]&&x<(mainButton1[0]+mainButton1[2])&&y<(mainButton1[1]+mainButton1[3]))
   						{
   							//alert(1);
   							main=false;
   							//alert('main:'+main+'end:'+end+'set:'+set);

   							initialize();
   						}
   					else if(x>mainButton2[0]&&y>mainButton2[1]&&x<(mainButton2[0]+mainButton2[2])&&y<(mainButton2[1]+mainButton2[3]))
   						{
   							//alert(2);
   							main=false;
   							setMenu();
   						}
   				}
   				else if(set===true)
   				{
   					if(x>0.9*width&&x<width&&y<width/10&&y>0)
   					{
   						main=true;
   						set=false;
   						mainMenu();
   					}
   					else if(x>width/4+120&&y>2*height/6-20&&x<width/4+120+width/4&&y<2*height/6-20+height/12)
   					{
   						//alert('w');
   						setW=true;
   						setS=false;
   						setA=false;
   						setD=false;
   					}
   					else if(x>width/4+120&&y>3*height/6-20&&x<width/4+120+width/4&&y<3*height/6-20+height/12)
   					{
   						//alert('s');
   						setS=true;
   						setW=false;
   						setA=false;
   						setD=false;
   					}
   					else if(x>width/4+120&&y>4*height/6-20&&x<width/4+120+width/4&&y<4*height/6-20+height/12)
   					{
   						//alert('a');
   						setA=true;
   						setS=false;
   						setW=false;
   						setD=false;
   					}
   					else if(x>width/4+120&&y>5*height/6-20&&x<width/4+120+width/4&&y<5*height/6-20+height/12)
   					{
   						//alert('d');
   						setD=true;
   						setS=false;
   						setA=false;
   						setW=false;
   					}
   				}
   				
   			}

   			document.addEventListener('touchstart',function(event)
   			{
   				startX=event.touches[0].pageX;
   				startY=event.touches[0].pageY;
   			});
   			
   			document.addEventListener('touchend',function(event)
   			{
   				endX=event.changedTouches[0].pageX;
   				endY=event.changedTouches[0].pageY;
   				lastArray=array.toString();
   				var changeX=endX-startX;
   				var changeY=endY-startY;
   				if(!main&&!set&&!end)
   				{
   					if(Math.abs(changeX)>=Math.abs(changeY))
   					{
   						if(changeX>0)
   						{
   							moveRight();
   						}
   						else
   						{
   							moveLeft();
   						}
   					}
   					else
   					{
   						if(changeY>0)
   						{
   							moveDown();
   						}
   						else
   						{
   							moveUp();
   						}
   					}
   					context.clearRect(0,0,width,height);
        			scoreText.clearRect(0,0,scoreText.canvas.width,scoreText.canvas.height)
        			gameDraw();
        			scoreTextDraw(step,score);
        			
        			

        			if(isGameOver())
        				gameOver();
        			else if(isWin())
        				win();
   				}
   			});
   			
		}

		function moveUp()
        {
          	var arr=new Array();
            for(let n=0;n<4;n++)
            {
                for(let i=0;i<4;i++)
                    arr[i]=array[n][3-i];
                arr=mergeBlock(arr);
                for(let i=0;i<4;i++)
                    array[n][3-i]=arr[i];
            }
                                        
            if(lastArray!==array.toString())
            {
                randomBlock();
                step++;
            }

        }
        function moveDown()
        {
        	var arr=new Array();
            for(let n=0;n<4;n++)
            {
                for(let i=0;i<4;i++)
                    arr[i]=array[n][i];
                arr=mergeBlock(arr);
                for(let i=0;i<4;i++)
                    array[n][i]=arr[i];
            }
                                        
            if(lastArray!==array.toString())
            {
                randomBlock();
                step++;
            }
        }
        function moveLeft()
        {
        	var arr=new Array();
            for(let n=0;n<4;n++)
            {
                for(let i=0;i<4;i++)
                    arr[i]=array[3-i][n];
                arr=mergeBlock(arr);
                for(let i=0;i<4;i++)
                    array[3-i][n]=arr[i];
            }
                                        
            if(lastArray!==array.toString())
            {
                randomBlock();
                step++;
            }
        }
        function moveRight()
        {
        	var arr=new Array();
            for(let n=0;n<4;n++)
            {
                for(let i=0;i<4;i++)
                    arr[i]=array[i][n];
                arr=mergeBlock(arr);
                for(let i=0;i<4;i++)
                    array[i][n]=arr[i];
            }
                                        
            if(lastArray!==array.toString())
            {
                randomBlock();
                step++;
            }
        }
		function setMenu()
		{
			set=true;
			context.clearRect(0,0,width,height);
			context.fillStyle="rgba(0,255,255,0.5)";
			context.fillRect(0,0,width,height);

			context.fillStyle="rgba(255,255,0,0.8)";
			context.font="bold 40px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillText("Key Setting",width/2,height/6);

			context.fillText("Up",width/4,2*height/6);
			context.fillText("Down",width/4,3*height/6);
			context.fillText("Left",width/4,4*height/6);
			context.fillText("Right",width/4,5*height/6);

			//context.fillStyle="rgba(255,255,255,1)";
			context.clearRect(width/4+120,2*height/6-20,width/4,height/12);
			context.fillRect(width/4+120,2*height/6-20,width/4,height/12);
			
			context.clearRect(width/4+120,3*height/6-20,width/4,height/12);
			context.fillRect(width/4+120,3*height/6-20,width/4,height/12);

			context.clearRect(width/4+120,4*height/6-20,width/4,height/12);
			context.fillRect(width/4+120,4*height/6-20,width/4,height/12);

			context.clearRect(width/4+120,5*height/6-20,width/4,height/12);
			context.fillRect(width/4+120,5*height/6-20,width/4,height/12);

			context.fillStyle="rgba(255,255,255,1)";
			context.fillText(keyUp,width/4+120+width/8,2*height/6-20+height/24);
			context.fillText(keyDown,width/4+120+width/8,3*height/6-20+height/24);
			context.fillText(keyLeft,width/4+120+width/8,4*height/6-20+height/24);
			context.fillText(keyRight,width/4+120+width/8,5*height/6-20+height/24);

			context.clearRect(width*0.9,0,width/10,width/10);
			context.fillStyle="rgba(255,0,0,0.9)";
			context.fillRect(width*0.9,0,width/10,width/10);
			context.fillStyle="rgba(255,255,255,1)";
			context.fillText('X',0.95*width,0.05*width);
			

		}



		function initialize()
		{
			step=0;
			score=0;
			end=false;
			main=false;
			for(let i=0;i<4;i++)
			{
				array[i]=new Array();
				for(let j=0;j<4;j++)
					array[i][j]=0;
			}
			context.clearRect(0,0,width,height);
			scoreText.clearRect(0,0,textWidth,textHeight);
			randomBlock();
			randomBlock();
			gameDraw();
			scoreTextDraw(step,score);
		}

		function Again()
		{
			context.clearRect(0,0,width,height);
			scoreText.clearRect(0,0,textWidth,textHeight);
			initialize();

		}


		function isGameOver()
		{
			var flag=0;	
			var oldScore=score;
			var arr=new Array();
        	for(let n=0;n<4;n++)
        	{
      			for(let i=0;i<4;i++)
      				arr[i]=array[n][3-i];
        		if(arr.toString()===mergeBlock(arr).toString())
        			flag++;
       					
       		}
       		if(flag<4)
       		{
       			score=oldScore;
       			return false;
       		}
       			
        	for(let n=0;n<4;n++)
       		{
        		for(let i=0;i<4;i++)
        			arr[i]=array[n][i];
        		if(arr.toString()===mergeBlock(arr).toString())
        			flag++;
        				
        	}
        	if(flag<8)
        	{
       			score=oldScore;
       			return false;
       		}	

        	for(let n=0;n<4;n++)
        	{
        		for(let i=0;i<4;i++)
        			arr[i]=array[3-i][n];
        		if(arr.toString()===mergeBlock(arr).toString())
        			flag++;
        				
        	}
        	if(flag<12)
        	{
       			score=oldScore;
       			return false;
       		}      				
        		
        	for(let n=0;n<4;n++)
        	{
        		for(let i=0;i<4;i++)
        			arr[i]=array[i][n];
        		if(arr.toString()===mergeBlock(arr).toString())
        			flag++;
        					
        	}
        	score=oldScore;
        	if(flag<16)
        	{
       			score=oldScore;
       			return false;
       		}	
        	else
        	{
       			score=oldScore;
       			return true;
       		}	
        			
		}

		function isWin()
		{
			for(let i=0;i<4;i++)
				for(let j=0;j<4;j++)
				{
					if(array[i][j]===2048)
						return true;
				}
			return false;
		}

		function win()
		{
			endMenu("Victory!");
		}

		function gameOver()
		{
			endMenu("Default!");
		}

		function endMenu(text)
		{
			
			context.fillStyle="rgba(128,0,128,0.2)";
			context.fillRect(menuX,menuY,menuWidth,menuHeight);

			context.font="bold 40px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillStyle="#000000";
			context.fillText(text,menuX+menuWidth/2,menuY+menuHeight/6);

			context.fillStyle="rgba(0,255,0,0.55)";
			//context.clearRect(menuX+menuWidth/3,menuY+menuHeight/3,menuWidth/3,menuHeight/8);
			//context.clearRect(menuX+menuWidth/3,menuY+menuHeight/3+menuHeight/8+menuHeight/10,menuWidth/3,menuHeight/8);
			context.fillRect(menuX+menuWidth/3,menuY+menuHeight/3,menuWidth/3,menuHeight/8);
			context.fillRect(menuX+menuWidth/3,menuY+menuHeight/3+menuHeight/8+menuHeight/10,menuWidth/3,menuHeight/8);

			context.font="bold 20px Arial";
			context.fillStyle="#ffffff";
			context.fillText("Again",menuX+menuWidth/3+menuWidth/6,menuY+menuHeight/3+menuHeight/16);
			context.fillText("Menu",menuX+menuWidth/3+menuWidth/6,menuY+menuHeight/3+menuHeight/8+menuHeight/10+menuHeight/16);



			end=true;
		}

		function mainMenu()
		{
			main=true;
			
			context.clearRect(0,0,width,height);
			scoreText.clearRect(0,0,textWidth,textHeight);
			context.fillStyle="rgba(0,0,255,0.3)";
			context.fillRect(0,0,width,height);
			context.font="bold 80px Arial";
			context.textAlign="center";
			context.textBaseline="middle";
			context.fillStyle="#ffffff";

			context.fillText("2048",width/2,height/4);
			context.fillStyle="rgba(0,128,128,0.6)";
			context.clearRect(mainMenuPosX,mainMenuPosY,mainMenuWidth,mainMenuHeight);
			context.clearRect(mainMenuPosX,mainMenuPosY+mainMenuHeight+0.05*height,mainMenuWidth,mainMenuHeight);
			context.fillRect(mainMenuPosX,mainMenuPosY,mainMenuWidth,mainMenuHeight);
			context.fillRect(mainMenuPosX,mainMenuPosY+mainMenuHeight+0.05*height,mainMenuWidth,mainMenuHeight);

			context.fillStyle="#000000";
			context.font="bold 35px Arial";
			context.fillText("Begin",mainMenuPosX+mainMenuWidth/2,mainMenuPosY+mainMenuHeight/2);
			context.fillText("Set",mainMenuPosX+mainMenuWidth/2,mainMenuPosY+mainMenuHeight+0.05*height+mainMenuHeight/2);
		}

		function roundRect(x,y,length,c)
		{
			context.beginPath();
			context.fillStyle=c;
			context.moveTo(x+10,y);
			context.arcTo(x+length,y,x+length,y+length,10);
			//context.moveTo(x+length,y+10);
			context.arcTo(x+length,y+length,x,y+length,10);
			//context.moveTo(x+length-10,y+length);
			context.arcTo(x,y+length,x,y,10);
			//context.moveTo(x,y+length-10);
			context.arcTo(x,y,x+length,y,10);
			context.fill();
			//context.stroke();
		}

		//roundRect(100,100,100,"red");

		function gameDraw()
		{
			var c,x,y;
			context.fillStyle="rgba(0,0,255,0.25)";
			context.fillRect(0,0,width,height);
			for(let i=0;i<4;i++)
				for(let j=0;j<4;j++)
				{
					  
					switch(array[i][j])
					{
						case 0:c="#d7c184";break;
						case 2:c="#f5bb82";break;
						case 4:c="#dbb280";break;
						case 8:c="#e1c57a";break;
						case 16:c="#e8b173";break;
						case 32:c="#f2a769";break;
						case 64:c="#e08931";break;
						case 128:c="#f27f0c";break;
						case 256:c="#f76063";break;
						case 512:c="#e84648";break;
						case 1024:c="#b03133";break;
						case 2048:c="#fc080c";break;
					}
					x=marginLength*(i+1)+blockLength*i;
					y=marginLength*(j+1)+blockLength*j;
					roundRect(x,y,blockLength,c);			
				}
			for(let i=0;i<4;i++)
				for(let j=0;j<4;j++)
				{
					x=marginLength*(i+1)+blockLength*i;
					y=marginLength*(j+1)+blockLength*j;
					if(array[i][j]>0)
					{
						context.font="bold 40px Arial";
						context.textAlign="center";
						context.textBaseline="middle";
						context.fillStyle="rgba(0,0,255,0.35)";
						context.fillText(array[i][j],x+blockLength/2,y+blockLength/2);
					}
				
				}
		}
		//gameDraw(matrix);

		function scoreTextDraw(step,score)
		{
			
			var textMargin=0.1*textWidth;
			var blockHeight=(textHeight-5*textMargin)/4;
			var blockWidth=textWidth-2*textMargin;

			scoreText.fillStyle="rgba(0,255,0,0.5)";
			scoreText.fillRect(0,0,textWidth,textHeight);

			scoreText.fillStyle="rgba(0,0,255,0.4)";
			scoreText.fillRect(textMargin,textMargin,blockWidth,blockHeight);

			scoreText.fillStyle="rgba(0,0,255,0.4)";
			scoreText.fillRect(textMargin,textMargin*3+blockHeight*2,blockWidth,blockHeight);

			scoreText.fillStyle="rgba(255,0,0,1)";
			scoreText.fillRect(0,textHeight-textWidth*0.3,textWidth,textWidth*0.3);
			scoreText.fillStyle="rgba(255,255,255,1)";
			scoreText.font="bold 25px Arial";
			scoreText.textAlign="center";
			scoreText.textBaseline-"middle";
			scoreText.fillText("Main Menu",textWidth/2,textHeight-textWidth*0.1);

			scoreText.fillStyle="#ffffff";
			scoreText.font="bold 30px Arial";
			scoreText.textAlign="center";
			scoreText.textBaseline-"middle";
			scoreText.fillText("Step",textMargin+blockWidth/2,textMargin+blockHeight/2);
			scoreText.fillText("Score",textMargin+blockWidth/2,textMargin*3+blockHeight*2+blockHeight/2);
			scoreText.fillText(step,textMargin+blockWidth/2,textMargin+3*blockHeight/2);
			scoreText.fillText(score,textMargin+blockWidth/2,textMargin*3+blockHeight*3+blockHeight/2);
		}
		function randomBlock() 
		{
			var flag=false;
			for(let i=0;i<4;i++)
				for(let j=0;j<4;j++)
				{
					if(array[i][j]==0)
					{
						flag=true;
					}
				}
			if(flag)
			{
				var value=Math.random()>0.5?4:2;
				var posX=Math.round(Math.random()*3);
				var posY=Math.round(Math.random()*3);
				if(array[posX][posY]==0)
					array[posX][posY]=value;
				else randomBlock();
			}
		}
		function mergeBlock(arr)
		{
			var flag=false;
			
			if( (arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]==0)||
				(arr[0]==0&&arr[1]==0&&arr[2]==0&&arr[3]>0)||
				(arr[0]==0&&arr[1]==0&&arr[2]>0&&arr[3]>0)||
				(arr[0]==0&&arr[1]>0&&arr[2]>0&&arr[3]>0)||
				(arr[0]>0&&arr[1]>0&&arr[2]>0&&arr[3]>0))
				{
					flag=true;

				}
			if( arr[0]==arr[1]&&arr[0]!=0||
				arr[2]==arr[1]&&arr[1]!=0||
				arr[2]==arr[3]&&arr[2]!=0)
				{
					flag=false;
				}
			if(!flag)
			{
				for(let i=3;i>0;i--)
				{
					if(arr[i]===0)
					{
						var tem=arr[i];
						arr[i]=arr[i-1];
						arr[i-1]=tem;
					}
					if(arr[i]===arr[i-1]&&arr[i]!=0)
					{
						arr[i]*=2;
						arr[i-1]=0;
						score+=arr[i]*10;
						//score+=10;
					}
				}
			}
			
			return flag===true?arr:mergeBlock(arr);
		}
