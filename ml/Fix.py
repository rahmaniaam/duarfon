import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
#import seaborn as sns

from random import seed
from random import randrange

train = pd.read_csv("fraud_train.csv")
test = pd.read_csv("fraud_test.csv")

train = train.drop(["flag_transaksi_finansial"], axis=1)
train = train.drop(["status_transaksi"], axis=1)
train = train.drop(["bank_pemilik_kartu"], axis=1)

test = test.drop(["flag_transaksi_finansial"], axis=1)
test = test.drop(["status_transaksi"], axis=1)
test = test.drop(["bank_pemilik_kartu"], axis=1)

# Calculate the Gini index for a split dataset
def gini_index(groups, classes):
    # count all samples at split point
    n_instances = float(sum([len(group) for group in groups]))
    # sum weighted Gini index for each group
    gini = 0.0
    for group in groups:
        size = float(len(group))
        # avoid divide by zero
        if size == 0:
            continue
        score = 0.0
        # score the group based on the score for each class
        for class_val in classes:
            p = [row[-1] for row in group].count(class_val) / size
            score += p * p
        # weight the group score by its relative size
        gini += (1.0 - score) * (size / n_instances)
    return gini

    # Split a dataset based on an attribute and an attribute value
def test_split(index, value, dataset):
    left, right = list(), list()
    for row in dataset:
        if row[index] < value:
            left.append(row)
        else:
            right.append(row)
    return left, right

    # Select the best split point for a dataset
def get_split(dataset):
    class_values = list(set(row[-1] for row in dataset))
    b_index, b_value, b_score, b_groups = 999, 999, 999, None
    for index in range(len(dataset[0])-1):
        for row in dataset:
            groups = test_split(index, row[index], dataset)
            gini = gini_index(groups, class_values)
            if gini < b_score:
                b_index, b_value, b_score, b_groups = index, row[index], gini, groups
    return {'index':b_index, 'value':b_value, 'groups':b_groups}

    # Create a terminal node value
def to_terminal(group):
    outcomes = [row[-1] for row in group]
    return max(set(outcomes), key=outcomes.count)

    # Create child splits for a node or make terminal
def split(node, max_depth, min_size, depth):
    left, right = node['groups']
    del(node['groups'])
    # check for a no split
    if not left or not right:
        node['left'] = node['right'] = to_terminal(left + right)
        return
    # check for max depth
    if depth >= max_depth:
        node['left'], node['right'] = to_terminal(left), to_terminal(right)
        return
    # process left child
    if len(left) <= min_size:
        node['left'] = to_terminal(left)
    else:
        node['left'] = get_split(left)
        split(node['left'], max_depth, min_size, depth+1)
    # process right child
    if len(right) <= min_size:
        node['right'] = to_terminal(right)
    else:
        node['right'] = get_split(right)
        split(node['right'], max_depth, min_size, depth+1)

        # Build a decision tree
def build_tree(train, max_depth, min_size):
    root = get_split(train)
    split(root, max_depth, min_size, 1)
    return root

    # Print a decision tree
def print_tree(node, depth=0):
    if isinstance(node, dict):
        print('%s[X%d < %.3f]' % ((depth*' ', (node['index']+1), node['value'])))
        print_tree(node['left'], depth+1)
        print_tree(node['right'], depth+1)
    else:
        print('%s[%s]' % ((depth*' ', node)))

        # Make a prediction with a decision tree
def predict(node, row):
    if row[node['index']] < node['value']:
        if isinstance(node['left'], dict):
            return predict(node['left'], row)
        else:
            return node['left']
    else:
        if isinstance(node['right'], dict):
            return predict(node['right'], row)
        else:
            return node['right']

            # Classification and Regression Tree Algorithm
def decision_tree(train, test, max_depth, min_size):
    tree = build_tree(train, max_depth, min_size)
    predictions = list()
    for row in test:
        prediction = predict(tree, row)
        predictions.append(prediction)
    return(predictions)

    # Split a dataset into k folds
def cross_validation_split(dataset, n_folds):
    dataset_split = list()
    dataset_copy = list(dataset)
    fold_size = int(len(dataset) / n_folds)
    for i in range(n_folds):
        fold = list()
        while len(fold) < fold_size:
            index = randrange(len(dataset_copy))
            fold.append(dataset_copy.pop(index))
        dataset_split.append(fold)
    return dataset_split


# Calculate accuracy percentage
def accuracy_metric(actual, predicted):
    correct = 0
    for i in range(len(actual)):
        if actual[i] == predicted[i]:
            correct += 1
    return correct / float(len(actual)) * 100.0

# Evaluate an algorithm using a cross validation split
def evaluate_algorithm(dataset, algorithm, n_folds, *args):
    folds = cross_validation_split(dataset, n_folds)
    scores = list()
    for fold in folds:
        train_set = list(folds)
        removearray(train_set, fold)
        train_set = sum(train_set, [])
        test_set = list()
        for row in fold:
            row_copy = list(row)
            test_set.append(row_copy)
            row_copy[-1] = None
            predicted = algorithm(train_set, test_set, *args)
        actual = [row[-1] for row in fold]
        accuracy = accuracy_metric(actual, predicted)
        scores.append(accuracy)
    return scores

def removearray(L,arr):
    ind = 0
    size = len(L)
    while ind != size and not np.array_equal(L[ind],arr):
        ind += 1
    if ind != size:
        L.pop(ind)
    else:
        raise ValueError('array not found in list.')

def custom_one_hot_encoder(df, test_df, target, cat=[]):

    for col in cat:
        target_0 = set(df[df[target] == 0][col].unique())
        target_1 = set(df[df[target] == 1][col].unique())
        targeted = target_1
        
        if len(target_0) < len(target_1):
            targeted = target_0
            
        for t in targeted:
            df[col + '_{}'.format(t)] = 0
            test_df[col + '_{}'.format(t)] = 0
    
        for i, row in df.iterrows():
            if row[col] in targeted:
                df.set_value(i,col + '_{}'.format(row[col]),1)
                
        for i, row in test_df.iterrows():
            if row[col] in targeted:
                test_df.set_value(i,col + '_{}'.format(row[col]),1)
    
    return df, test_df

target = "flag_transaksi_fraud"

cat = [
    "tipe_kartu",
    "id_merchant",
    "nama_merchant",
    "tipe_mesin",
    "tipe_transaksi",
    "nama_negara",
    "nama_kota",
    "lokasi_mesin",
    "pemilik_mesin",
    "kepemilikan_kartu",
    "nama_channel",
    "id_channel"
]

df = train.copy()[:100]
test_df = test.copy()[:100]
df, test_df = custom_one_hot_encoder(df, test_df, target, cat)

def fillNaN(dataset):
    for row_idx in range(dataset.shape[0]):
        for col_idx in range(dataset.shape[1]):
            if np.isnan(dataset[row_idx][col_idx]):
                dataset[row_idx][col_idx] = 0.0
    return dataset

dataTrain = fillNaN(df[:100].values)
dataTest = fillNaN(test_df[:100].values)

seed(5)
n_folds = 5
max_depth = 500
min_size = 1
scores = evaluate_algorithm(dataTrain, decision_tree, n_folds, max_depth, min_size)
print('Scores: %s' % scores)
print('Mean Accuracy: %.3f%%' % (sum(scores)/float(len(scores))))

datatest = test[:100].values
pred = decision_tree(dataTrain, dataTest, max_depth, min_size)
print(pred)