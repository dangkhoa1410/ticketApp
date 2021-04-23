import React from 'react'

const StoryForm = props => {
    return (
        <div class="col-8 offset-2">
            <form onSubmit = {props.onSubmitHandler}>

                <div class="form-group row">
                    {
                        props.errors ? <ul className="text-danger"><li>{props.errors}</li></ul> : ""
                    }
                </div>
                <div class="form-group row">
                    <label htmlFor="summary" class="col-sm-2 col-form-label">Summary</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="summary" placeholder="Summary" onChange= {props.onChangeHandler} value={props.form.summary}/>
                    </div>
                </div>

                <div class="form-group row">
                    <label htmlFor="description" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                    <textarea class="form-control" id="description" placeholder="Description" onChange= {props.onChangeHandler} value={props.form.description}/>
                    </div>
                </div>
                
                <div class="form-group row">
                    <label htmlFor="type" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="type" placeholder="Type" onChange= {props.onChangeHandler} value={props.form.type}>
                            <option>bugfix</option>
                            <option>development</option>
                            <option>enhancement</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label htmlFor="complexity" class="col-sm-2 col-form-label">Complexity</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="complexity" placeholder="Complexity" onChange= {props.onChangeHandler} value={props.form.complexity}>
                            <option>low</option>
                            <option>mid</option>
                            <option>high</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label htmlFor="estimatedHrs" class="col-sm-2 col-form-label">Estimated Hrs</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="estimatedHrs" placeholder="Estimated Hrs" onChange= {props.onChangeHandler} value={props.form.estimatedHrs}/>
                    </div>
                </div>

                <div class="form-group row">
                    <label htmlFor="cost" class="col-sm-2 col-form-label">Cost</label>
                    <div class="col-sm-10 input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="number" class="form-control" id="cost" placeholder="$10" onChange= {props.onChangeHandler} value={props.form.cost}/>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default StoryForm;