import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'

export class main extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser == undefined){
            return(
                <View style = {{flex:1 , justifyContent: 'center', alignItems:'center'}}> 
                    <ActivityIndicator size="large" color = "#f44336" />
                </View>
            )
        }
        return (
            <View style = {{flex:1 , justifyContent: 'center', alignItems:'center'}}> 
                <Text>{currentUser.name} is Logged in..</Text>
            </View>
        )
    }
}
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch);


export default connect(mapStateToProps, mapDispatchProps)(main);
