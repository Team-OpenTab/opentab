import { connect } from 'react-redux';
import Content from '../components/Content';

const mapStateToProps = state => ({
  stage: state.stage,
});
export default connect(
  mapStateToProps,
  null,
)(Content);
