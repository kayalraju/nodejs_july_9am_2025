


class HomeController{
    async index(req,res){
        try{
            res.render('index',{
                title:"Home Page",
                user:{
                    status:true,
                    name:"sagar",
                    age:25
                }
            })

        }catch(error){
            console.log(error);
            
        }
        
    }

    about(req,res){
        res.send("about page");
    }

    product(req,res){
        res.send("product page")
    }
}

module.exports=new HomeController();