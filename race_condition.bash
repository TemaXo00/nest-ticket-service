#!/bin/bash

URL="http://localhost:3001/tickets/reserve"
EVENT_ID="64ee6d48-ab61-4a03-9784-944af0da6bde"

send_request() {
    local user_id=$1
    local response=$(curl -s -X POST "$URL" \
        -H "Content-Type: application/json" \
        -d "{\"event_id\": \"$EVENT_ID\", \"user_id\": \"$user_id\"}")
    echo "$(date +%H:%M:%S.%3N) - User: $user_id - Response: $response"
}

send_request "user_1" &
send_request "user_2" &

wait
