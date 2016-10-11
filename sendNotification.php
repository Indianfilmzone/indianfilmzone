<?PHP


function sendNotification($tokens,$message)
{
	
	$url = 'https://fcm.googleapis.com/fcm/send';
	
	$fields =array(
		'registration_ids' => $tokens,
		'data' => $message
	);

	$headers =array(
	'Authorization:key= AIzaSyDReegD9ClZkJLUg6bST3tGU399BJRWigU',
	'Content-Type: application/json'
	);



		$ch = curl_init(); 
        // set url 
        curl_setopt($ch, CURLOPT_URL, $url); 
        curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); 
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

        $result = curl_exec($ch); 
		
		echo $result ;
		if( $result = FALSE){
			echo curl_error($ch);
			//die('Curl Failed: '. curl_error($ch));
		}

        curl_close($ch);

return $result;
}


$tokens =array();
$tokens[] = "fWPGn_3Bkyg:APA91bEFL7KNnJ68QZ847gGPgraZ9lHOvOZdzTl2_no4XY6GCi-Xay4F-qTAGVB4xnVTXmxlRW_4f6A6l0STaJ2TCSO1fUI2b_i7_eE8hf9Ja4TW03_1jz8eW05twkhwqIdEgBU__wGW";
$message =array("message" => "FCM puch notification message");
$message_status=sendNotification($tokens,$message);

echo $message_status;

?>