

const Part = ({name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </ul>
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
      <Content parts={course.parts}/>
    </div>
    
  )
}

const Course = ({ course }) => {
  return (
    <div>
       <Header course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
      
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App