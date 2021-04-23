import React from 'react'

const LoginForm = props => {
    return (
        <div class="col-6 offset-3">
            
            <form onSubmit = {props.onSubmitHandler}>
                <div class="form-group row">
                    <label htmlFor="email" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" placeholder="Email" onChange= {props.onChangeHandler} value={props.form.email}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label htmlFor="pwd" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                    <input type="password" class="form-control" id="pwd" placeholder="Password" onChange= {props.onChangeHandler} value={props.form.pwd}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <div class="col-sm-2">Admin</div>
                    <div class="col-sm-1">
                        <div class="custom-control custom-switch">
                            <input class="custom-control-input" type="checkbox" id="isAdmin" onChange= {props.isAdminHandler} checked={props.form.isAdmin}/>
                            <label class="custom-control-label" htmlFor="isAdmin"></label>
                        </div>
                    </div>
                </div>
                
                <div class="form-group row">
                    <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;