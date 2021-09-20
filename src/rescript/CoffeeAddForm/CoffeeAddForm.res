@module external styles: {..} = "./styles.module.css"

module StarRating = {
  @module("../../components/StarRating") @react.component
  external make: (~rating: int) => React.element = "default"
}

@react.component
let make = () => {
  let (name, setName) = React.useState(_ => "")
  let (location, setLocation) = React.useState(_ => "")
  let (authorization, setAuthorization) = React.useState(_ => "")
  let (rating, setRating) = React.useState(_ => 0)
  let (triggerDeploy, setTriggerDeploy) = React.useState(_ => false)

  let onChange = (evt, updater) => {
    ReactEvent.Form.preventDefault(evt)
    let value = ReactEvent.Form.target(evt)["value"]
    updater(_prev => value)
  }

  let onChangeTriggerDeploy = _ => {
    setTriggerDeploy(_prev => !_prev)
  }

  let resetForm = () => {
    setName(_ => "")
    setLocation(_ => "")
    setAuthorization(_ => "")
    setRating(_ => 0)
    setTriggerDeploy(_ => false)
  }

  let onSubmit = _ => {
    let r = Belt.Int.toString(rating)
    Js.log(`${name} ${location} ${r}`)
  }

  <div className={styles["root"]}>
    <input name="name" placeholder="Name" value=name onChange={e => onChange(e, setName)} />
    <input
      name="location" placeholder="Location" value=location onChange={e => onChange(e, setLocation)}
    />
    <input
      name="rating"
      type_="number"
      value={Belt.Int.toString(rating)}
      placeholder="Rating"
      onChange={e => onChange(e, setRating)}
    />
    <div> <StarRating rating /> </div>
    <input
      name="authorization"
      placeholder="Authorization"
      value={authorization}
      onChange={e => onChange(e, setAuthorization)}
    />
    <div>
      <input type_="checkbox" onChange=onChangeTriggerDeploy className={styles["checkbox"]} />
      {React.string("Should trigger deploy")}
    </div>
    <button onClick=onSubmit className={styles["submitButton"]}> {React.string("Submit")} </button>
  </div>
}
