import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { TodolistProps, TodoCardProps } from "./types";

export default class Todolist extends React.Component<TodolistProps> {
    render() {
        return (
            <View style={{ margin: 16 }}>
                <LinearGradient
                    colors={this.props.calendar.color}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{
                        borderRadius: 4,
                        marginBottom: 16,
                        width: this.props.calendar.title.length * 24
                    }}
                >
                    <View style={{padding: 8, marginStart: 8, backgroundColor: "rgba(0,0,0,0.3)"}}>
                        <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>{this.props.calendar.title}</Text>
                    </View>
                </LinearGradient>
                {this.props.calendar.todos.map(todo => {
                    if (!todo.complete) return <TodoCard key={todo.id} todo={todo} />;
                })}
            </View>
        );
    }
}

class TodoCard extends React.Component<TodoCardProps> {
    render() {
        const todo = this.props.todo;
        return (
            <View style={{ margin: 16, paddingStart: 16, borderStartWidth: 4, borderStartColor: "rgb(60,60,60)" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{todo.name}</Text>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 16, opacity: 0.5, marginTop: 8 }}>
                    {todo.DeadLine.getMonth() +
                        1 +
                        "月" +
                        todo.DeadLine.getDate() +
                        "日" +
                        todo.DeadLine.getHours() +
                        ":" +
                        todo.DeadLine.getMinutes() +
                        " 截止"}
                </Text>
            </View>
        );
    }
}
