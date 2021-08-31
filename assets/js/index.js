


$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/users"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this user?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                
            })
            location.assign("http://localhost:3000/users");
        }

    })
}
$("#add_product").submit(function(event){
    alert("Data Inserted Successfully!");
})
$("#update_product").submit(function(event){
    event.preventDefault()
    var unindexed_array=$(this).serializeArray()
    var data ={}
    $.map(unindexed_array,function(n,i){
        data[n["name"]]= n['value']
    })
    var request = {

        "url": `http://localhost:3000/api/products/${data.id}`,
        "method":"PUT",
        "data": data
    }
    $.ajax(request).done(function(response){
        alert:("Data updated")
    })
})
if(window.location.pathname=="/products"){
    $ondelete=$(".table tbody td a.delete" )
    $ondelete.click(function(){
        var id= $(this).attr("data-id")
        var request={
            "url": `http://localhost:3000/api/products/${id}`,
            "method":"DELETE",
        }
        if(confirm("Do you want to delete?")){
            $.ajax(request).done(function(response){
                alert:("Data deleted")
                location.reload
        })
    }
})
}