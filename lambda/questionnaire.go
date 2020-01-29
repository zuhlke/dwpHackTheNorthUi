package main

import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
)

type Question struct {
	Id   int
	Text string
}

func retrieveQuestions() ([]*Question, error) {
	clientOptions := options.Client().ApplyURI("")
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	collection := client.Database("").Collection("")
	var questions []*Question

	cur, err := collection.Find(context.TODO(), bson.D{{}}, options.Find())

	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	for cur.Next(context.TODO()) {
		var question Question
		err := cur.Decode(&question)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		questions = append(questions, &question)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
		return nil, err
	}

	cur.Close(context.TODO())

	return questions, nil
}

func main() {
	lambda.Start(retrieveQuestions)
}
