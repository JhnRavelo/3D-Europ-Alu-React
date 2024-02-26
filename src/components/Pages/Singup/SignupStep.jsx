import propTypes from 'prop-types';
import SignupStepTemplate from './SignupStepTemplate';
import SignupStepPassword from './SignupStepPassword';
import SignupStepFinal from './SignupStepFinal';
import Login from '../Login/Login';

const SignupStep = ({ index }) => {
  if (index == 2) {
    return <SignupStepPassword />;
  } else if (index == 4) {
    return <SignupStepFinal />;
  } else if(index == 5){
    return <Login/>
  } else {
    return <SignupStepTemplate index={index} />;
  }
};

SignupStep.propTypes = {
  index: propTypes.number,
};

export default SignupStep;
